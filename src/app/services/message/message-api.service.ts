import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message, Thread, ThreadMetaData, User } from '@nater20k/brass-exchange-users';
import firebase from 'firebase/app';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
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
        switchMap((threadId) => {
          return threadId
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
              );
        })
      );
    }
  }

  addMessageToThread(message: Message): Observable<string> {
    const ref = this.afs.collection('threads').doc(message.threadId);
    return from(
      ref.update({
        messages: firebase.firestore.FieldValue.arrayUnion(message),
      })
    ).pipe(
      map(() => message.threadId),
      catchError((err) => of(err))
    );
  }

  createThread(sender: string, recipient: string): Observable<string> {
    const id = this.afs.createId();
    return from(
      this.afs
        .collection('threads')
        .doc(id)
        .set({ owners: [sender, recipient] })
    ).pipe(map(() => id));
  }

  // doesUserAlreadyHaveThread(recipient: string): Observable<string> {}

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
    return this.userApi.getUserByUsername(username).pipe(
      take(1),
      switchMap((user) => {
        const metaData: ThreadMetaData = {
          id: messageId,
          recipient,
        };
        user.threads?.length > 0
          ? user.threads.push(metaData) // TODO: put typing in library
          : (user.threads = [metaData]); // TODO: put typing in library
        return this.userApi.updateUser(user);
      }),
      map(() => username)
    );
  }

  getThreads(user: User): Observable<Partial<Thread[]>> {
    const threads: Thread[] = [];
    return this.afs
      .collection<Thread>('threads')
      .valueChanges({ idField: 'id' })
      .pipe(
        map((unmappedThreads) => {
          return unmappedThreads.filter((allThreads) =>
            user.threads.find((userThreads) => allThreads.id === userThreads.id)
          );
        })
      );
  }

  fetchThreadIdByRecipient(message: Message): Observable<string> {
    return this.auth.user$.pipe(
      map((user) => user?.threads.find((thread) => thread.recipient === message.recipient.username)),
      map((metaData) => metaData.id),
      catchError(() => of(null))
    );
  }
}

// export interface Thread {
//   id?: string;
//   messages?: Message[];
//   owners: string[];
// }

// export interface Message {
//   body: string;
//   sendDate: Date;
//   sender: {
//     username: string;
//   };
//   recipient: {
//     username: string;
//     hasReadMessage: boolean;
//   };
//   threadId?: string;
// }

// export interface ThreadMetaData {
//   id: string;
//   recipient: string;
//   messageCount?: number;
// }
