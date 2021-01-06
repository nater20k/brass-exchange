import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ForSaleListing, Instrument } from '@nater20k/brass-exchange-instruments';
import { User } from '@nater20k/brass-exchange-users';
import firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  afsPath = this.afs.collection<User>('users');

  constructor(private afs: AngularFirestore) {}

  // Create
  createUser(user: User): Observable<DocumentReference | void> {
    return from(user.uid ? this.afsPath.doc(user.uid).set(user) : this.afsPath.add(user));
  }

  // Read
  getAllUsers(): Observable<User[]> {
    return this.afsPath.valueChanges({ idField: 'id' }).pipe(catchError(() => of(null)));
  }

  getSingleUser(userId: string): Observable<User> {
    return this.afsPath
      .doc<User>(userId)
      .valueChanges()
      .pipe(
        take(1),
        catchError(() => of(null))
      );
  }

  getUserByEmail(email: string): Observable<User> {
    return this.afs
      .collection<User>('users', (ref) => ref.where('email', '==', email))
      .valueChanges()
      .pipe(map((users) => users[0]));
  }

  getUserByUsername(username: string): Observable<User> {
    return this.afs
      .collection<User>('users', (ref) => ref.where('displayName', '==', username))
      .valueChanges()
      .pipe(
        take(1),
        map((users) => users[0]),
        catchError((err) => of(null))
      );
  }

  fetchUserMetaDataIfExists(username: string): Observable<boolean> {
    return this.afs
      .collection<User>('users', (ref) => ref.where('displayName', '==', username))
      .valueChanges()
      .pipe(
        take(1),
        map((users) => users.length > 0)
      );
  }

  // Update
  updateUser(user: Partial<User>): Observable<void> {
    return from(this.afsPath.doc(user.uid).update(user)).pipe(take(1));
  }

  // Delete
  deleteUser(userId: string): Observable<void> {
    return from(this.afsPath.doc(userId).delete()).pipe(
      take(1),
      catchError(() => of(null))
    );
  }

  // INSTRUMENTS BY USER

  addToPersonalInstrumentsListed(userId: string, forSaleListing: ForSaleListing): Observable<void> {
    return this.getSingleUser(userId).pipe(
      map((user) => {
        user.instrumentsListed.push(forSaleListing);
        return user;
      }),
      switchMap((user) => this.updateUser(user))
    );
  }

  // Read
  getInstrumentsForSaleByUser(userId: string): Observable<ForSaleListing[]> {
    return this.getSingleUser(userId).pipe(map((user) => user.instrumentsListed));
  }

  getFavoritedInstrumentsByUserId(userId: string): Observable<Instrument[]> {
    return this.afsPath
      .doc<User>(userId)
      .valueChanges()
      .pipe(
        map((user) => user.favoritedInstruments),
        catchError(() => of(null))
      );
  }

  // FAVORITES SECTION

  addFavoritedInstrumentToUser(userId: string, instrument: ForSaleListing): Observable<void> {
    return from(
      this.afs
        .collection('users')
        .doc(userId)
        .update({
          favoritedInstruments: firebase.firestore.FieldValue.arrayUnion(instrument),
        })
    );
  }

  removeFavoritedInstrumentFromUser(userId: string, forSaleListing: ForSaleListing): Observable<void> {
    // return this.getSingleUser(userId).pipe(
    //   switchMap((user) => {
    //     const remainingFavorites = user.favoritedInstruments.filter(
    //       (instrument) => instrument.id !== forSaleListing.id
    //     );
    //     return this.updateUser({
    //       ...user,
    //       favoritedInstruments: firebase.firestore.FieldValue.arrayRemove(forSaleListing) as any,
    //     });
    //   })
    // );

    return this.getSingleUser(userId).pipe(
      map(
        (user) =>
          (user = {
            ...user,
            favoritedInstruments: user.favoritedInstruments.filter((instrument) => instrument.id !== forSaleListing.id),
          })
      ),
      switchMap((user) => this.updateUser(user))
    );
  }
}
