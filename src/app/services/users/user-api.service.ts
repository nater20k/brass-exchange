import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ForSaleListing, Instrument } from '@nater20k/brass-exchange-instruments';
import { User } from '@nater20k/brass-exchange-users';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, take, catchError, tap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private afs: AngularFirestore) {}
  afsPath = this.afs.collection<User>('users');

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
      .pipe(
        tap(console.log),
        map((users) => users[0]),
        tap(console.log)
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
    return this.getSingleUser(userId).pipe(
      switchMap((user) => {
        user?.favoritedInstruments
          ? user.favoritedInstruments.push(instrument)
          : (user.favoritedInstruments = [instrument]);
        return this.updateUser(user);
      })
    );
  }

  removeFavoritedInstrumentFromUser(userId: string, forSaleListing: ForSaleListing): Observable<void> {
    return this.getSingleUser(userId).pipe(
      switchMap((user) => {
        const remainingFavorites = user.favoritedInstruments.filter(
          (instrument) => instrument.id !== forSaleListing.id
        );
        return this.updateUser({ ...user, favoritedInstruments: remainingFavorites });
      })
    );
  }
}
