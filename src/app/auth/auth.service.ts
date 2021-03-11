import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DocumentReference } from '@angular/fire/firestore';
import { User, UserFormGroup } from '@nater20k/brass-exchange-users';
import firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import { catchError, finalize, switchMap, take, tap } from 'rxjs/operators';
import { keys, SessionService } from '../services/session.service';
import { UserAdapterService } from '../services/users/user-adapter.service';
import { UserApiService } from '../services/users/user-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private userAdapter: UserAdapterService,
    private userApiService: UserApiService,
    private sessionService: SessionService
  ) {
    this.user$ = this.setUser();
  }

  setUser(): Observable<User> {
    return this.sessionService.getItemFromLocalStorage<User>(keys.loggedInUser)
      ? of(this.sessionService.getItemFromLocalStorage(keys.loggedInUser))
      : this.afAuth.authState.pipe(
          switchMap((user) => {
            if (user) {
              return this.userApiService.getSingleUser(user.uid).pipe(
                tap((mappedUser) => {
                  this.sessionService.setToLocalStorage(mappedUser, keys.loggedInUser);
                })
              );
            } else {
              return of(null);
            }
          })
        );
  }

  googleSignIn(): Observable<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return from(this.afAuth.signInWithPopup(provider)).pipe(
      tap(() => firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION))
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

  signOut(): Observable<void> {
    return from(this.afAuth.signOut()).pipe(
      take(1),
      finalize(() => this.sessionService.deleteItemFromLocalStorage(keys.loggedInUser)),
      catchError(() => of(null))
    );
  }

  updateUserData(
    user: firebase.auth.UserCredential,
    userFormGroup?: UserFormGroup
  ): Observable<void | DocumentReference> {
    if (user.additionalUserInfo.isNewUser) {
      return this.userApiService.createUser(this.userAdapter.mapUserFromRegister(user, userFormGroup));
    } else {
      return this.userApiService.updateUser(this.userAdapter.mapUserFromRegister(user, userFormGroup));
    }
  }

  private fetchFirestoreUser(user: firebase.auth.UserCredential): Observable<User> {
    return this.userApiService.getSingleUser(user.user.uid).pipe(
      take(1),
      catchError(() => of(null))
    );
  }
}
