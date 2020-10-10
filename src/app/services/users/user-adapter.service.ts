import { Injectable } from '@angular/core';
import { User } from '@nater20k/brass-exchange-users';
import { UserFormGroup } from '@nater20k/brass-exchange-users';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UserAdapterService {
  mapUserFromRegister(
    user: auth.UserCredential,
    userFormGroup?: UserFormGroup
  ): User {
    return userFormGroup
      ? {
          ...this.mapFormGroupUser(userFormGroup),
          ...this.mapPartialFirebaseUser(user),
        }
      : this.mapFullFirebaseUser(user);
  }

  private mapPartialFirebaseUser(user: auth.UserCredential) {
    return {
      uid: user.user.uid,
      displayName: user.user.displayName,
      email: user.user.email,
      dateAccountCreated: new Date(user.user.metadata.creationTime),
      photoUrl: user.user.photoURL,
    };
  }

  private mapFullFirebaseUser(user: auth.UserCredential) {
    return {
      uid: user.user.uid,
      displayName: user.user.displayName,
      firstName: user.additionalUserInfo.profile['given_name'],
      lastName: user.additionalUserInfo.profile['family_name'],
      email: user.user.email,
      dateAccountCreated: new Date(user.user.metadata.creationTime),
      photoUrl: user.user.photoURL,
      principalInstrument: '',
      instrumentsListed: [],
      rating: 0,
    };
  }

  private mapFormGroupUser(userFormGroup: UserFormGroup) {
    return {
      firstName: userFormGroup.firstName,
      lastName: userFormGroup.lastName,
      principalInstrument: userFormGroup.principalInstrument,
      instrumentsListed: [],
      rating: 0,
    };
  }
}
