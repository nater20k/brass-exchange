import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { DocumentReference } from '@angular/fire/firestore';

import { Observable, of, from } from 'rxjs';
import { switchMap, take, catchError, tap, map } from 'rxjs/operators';
import { UserApiService } from '../services/users/user-api.service';
import { User, UserFormGroup } from '@nater20k/brass-exchange-users';
import { UserAdapterService } from '../services/users/user-adapter.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private userAdapter: UserAdapterService,
    private userApiService: UserApiService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.userApiService.getSingleUser(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }

  googleSignIn(): Observable<User> {
    const provider = new firebase.auth.GoogleAuthProvider();

    return from(this.afAuth.signInWithPopup(provider)).pipe(
      switchMap((user) => from(this.updateUserData(user).pipe(switchMap(() => this.fetchFirestoreUser(user))))),
      tap(() => firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)),
      take(1),
      catchError(() => of(null))
    );
  }

  emailRegister(userFormGroup: UserFormGroup): Observable<void | DocumentReference> {
    const { email, password } = userFormGroup;

    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((user) => this.updateUserData(user, userFormGroup)),
      tap(() => firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)),
      take(1)
    );
  }

  emailSignIn(params: UserFormGroup): Observable<User | Error> {
    return from(this.afAuth.signInWithEmailAndPassword(params.email, params.password)).pipe(
      switchMap((user) => this.fetchFirestoreUser(user)),
      tap(() => firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)),
      take(1)
    );
  }

  private fetchFirestoreUser(user: firebase.auth.UserCredential): Observable<User> {
    return this.userApiService.getSingleUser(user.user.uid).pipe(
      take(1),
      catchError(() => of(null))
    );
  }

  signOut(): Observable<void> {
    return from(this.afAuth.signOut()).pipe(
      take(1),
      catchError(() => of(null))
    );
  }

  private updateUserData(
    user: firebase.auth.UserCredential,
    userFormGroup?: UserFormGroup
  ): Observable<void | DocumentReference> {
    return this.userApiService
      .createUser(this.userAdapter.mapUserFromRegister(user, userFormGroup))
      .pipe(catchError(() => of(null)));
  }
}
