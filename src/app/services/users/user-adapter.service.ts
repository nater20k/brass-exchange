import { Injectable } from '@angular/core';
import { User, UserFormGroup } from '@nater20k/brass-exchange-users';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UserAdapterService {
  mapUserFromRegister(user: firebase.auth.UserCredential, userFormGroup?: UserFormGroup): User {
    return userFormGroup
      ? {
          ...this.mapFormGroupUser(userFormGroup),
          ...this.mapPartialFirebaseUser(user),
        }
      : this.mapFullFirebaseUser(user);
  }

  private mapPartialFirebaseUser({ user }: firebase.auth.UserCredential): any {
    return {
      uid: user.uid,
      email: user.email,
      dateAccountCreated: new Date(user.metadata.creationTime),
      photoUrl: user.photoURL,
    };
  }

  private mapFullFirebaseUser({ user, additionalUserInfo }: firebase.auth.UserCredential): Partial<User> {
    const mappedUser: Partial<User> = {
      uid: user.uid,
      firstName: (additionalUserInfo.profile as any).given_name,
      lastName: (additionalUserInfo.profile as any).family_name,
      email: user.email,
      dateAccountCreated: new Date(user.metadata.creationTime),
      photoUrl: user.photoURL,
      principalInstrument: '',
      instrumentsListed: [],
      rating: 0,
    };
    return mappedUser;
  }

  private mapFormGroupUser({ firstName, lastName, principalInstrument, displayName }: UserFormGroup): any {
    return {
      firstName,
      lastName,
      displayName,
      principalInstrument,
      instrumentsListed: [],
      rating: 0,
    };
  }
}
