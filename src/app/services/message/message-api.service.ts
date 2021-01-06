import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message, Thread, ThreadMetaData, User } from '@nater20k/brass-exchange-users';
import firebase from 'firebase/app';
import { forkJoin, from, Observable, zip } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { UserApiService } from '../users/user-api.service';

@Injectable({
  providedIn: 'root',
})
export class MessageApiService {
  constructor(private afs: AngularFirestore, private auth: AuthService, private userApi: UserApiService) {}

  threadManager(message: Message): Observable<string> {
    if (message.threadId) {
      return this.addMessageToThread(message).pipe(map(() => message.threadId));
    } else {
      return this.fetchThreadIdByRecipient(message).pipe(
        switchMap((threadId) =>
          threadId
            ? this.addMessageToThread({ ...message, threadId })
            : this.createThread(message.sender.username, message.recipient.username).pipe(
                switchMap((id) =>
                  this.addMessageToThread({ ...message, threadId: id }).pipe(
                    switchMap(() =>
                      forkJoin([
                        this.addThreadIdToUser(id, message.sender.username, message.recipient.username),
                        this.addThreadIdToUser(id, message.recipient.username, message.sender.username),
                      ]).pipe(map(() => id))
                    )
                  )
                )
              )
        )
      );
    }
  }

  addMessageToThread(message: Message): Observable<string> {
    const ref = this.afs.collection('threads').doc(message.threadId);
    return from(
      ref.update({
        messages: firebase.firestore.FieldValue.arrayUnion(message),
        lastResponse: firebase.firestore.Timestamp.now(),
      })
    ).pipe(map(() => message.threadId));
  }

  createThread(senderUsername: string, recipientUsername: string): Observable<string> {
    const docId = this.afs.createId();
    return zip(
      this.auth.user$.pipe(map((user) => ({ id: user.uid, username: user.displayName }))),
      this.userApi
        .getUserByUsername(recipientUsername)
        .pipe(map((user) => ({ id: user.uid, username: user.displayName })))
    ).pipe(
      switchMap((threadOwners) => this.afs.collection('threads').doc(docId).set({ owners: threadOwners })),
      map(() => docId)
    );
  }

  getMessagesFromThread(threadId: string): Observable<Message[]> {
    return this.afs
      .collection('threads')
      .doc<Thread>(threadId)
      .valueChanges()
      .pipe(map((thread) => thread.messages));
  }

  getThreadById(threadId: string): Observable<Thread> {
    return this.afs.collection('threads').doc<Thread>(threadId).valueChanges();
  }

  addThreadIdToUser(messageId: string, username: string, recipient: string): Observable<string> {
    const metaData: ThreadMetaData = {
      id: messageId,
      recipient,
    };
    return this.userApi.getUserByUsername(username).pipe(
      take(1),
      tap((user) => (user.threads?.length > 0 ? user.threads.push(metaData) : (user.threads = [metaData]))),
      switchMap((user) => this.userApi.updateUser(user)),
      map(() => username)
    );
  }

  getThreads(user: User): Observable<Partial<Thread[]>> {
    return this.afs
      .collection<Thread>('threads', (ref) =>
        ref.where('owners', 'array-contains', { id: user.uid, username: user.displayName })
      )
      .valueChanges({ idField: 'id' })
      .pipe(map((filterdThreads) => filterdThreads.sort(this.sortByResponseTime)));
  }

  fetchThreadIdByRecipient(message: Message): Observable<string> {
    return this.auth.user$.pipe(
      map((user) => user?.threads.find((thread) => thread.recipient === message.recipient.username)),
      map((metaData) => metaData?.id)
    );
  }

  private sortByResponseTime(a: Thread, b: Thread): -1 | 0 | 1 {
    if (a.lastResponse > b.lastResponse) {
      return -1;
    } else if (a.lastResponse < b.lastResponse) {
      return 1;
    } else {
      return 0;
    }
  }
}

export interface ThreadOwner {
  id: string;
  username: string;
}
