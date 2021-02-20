import { Injectable } from '@angular/core';
import { User } from '@nater20k/brass-exchange-users';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  loggedInUser: BehaviorSubject<User>;
  localStorageKeyPrefix = 'brass-exchange';
  constructor() {}

  setToLocalStorage<T>(itemToBeStored: T, key: string) {
    localStorage[`${this.localStorageKeyPrefix}-${key}`] = JSON.stringify(itemToBeStored);
  }

  getItemFromLocalStorage<T>(key: string): T {
    let response;
    if (localStorage[`${this.localStorageKeyPrefix}-${key}`]) {
      response = JSON.parse(localStorage[`${this.localStorageKeyPrefix}-${key}`]);
    }
    return response;
  }

  deleteItemFromLocalStorage(key: string) {
    localStorage.removeItem(`${this.localStorageKeyPrefix}-${key}`);
  }
}

export const keys = {
  loggedInUser: 'loggedInUser',
};
