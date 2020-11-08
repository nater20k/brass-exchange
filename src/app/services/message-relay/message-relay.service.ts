import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Message } from '@nater20k/brass-exchange-users';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UserApiService } from '../users/user-api.service';
import { ContactSeller } from './message-relay.adapter';

@Injectable({
  providedIn: 'root',
})
export class MessageRelayService {
  constructor(private fb: FormBuilder, private userApi: UserApiService) {}

  sendMessageToSeller(message: Message): Observable<void> {
    return this.userApi.getUserByEmail(message.messageTo).pipe(
      take(1),
      switchMap((user) => {
        user.messages ? user.messages.push(message) : (user.messages = [message]);
        return this.userApi.updateUser(user);
      })
    );
  }

  fetchContactSellerFormGroup(prefill: ContactSellerPreFill): ContactSeller {
    return new ContactSeller(
      this.fb.group({
        messageTo: this.fb.control(prefill?.messageTo || '', Validators.required),
        messageFrom: this.fb.control(prefill?.messageFrom || '', Validators.required),
        messageContent: this.fb.control('', Validators.required),
        sentDate: this.fb.control('', Validators.required),
      })
    );
  }
}

export interface ContactSellerPreFill {
  messageTo: string;
  messageFrom: string;
}
