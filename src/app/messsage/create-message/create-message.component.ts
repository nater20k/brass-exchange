import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from '@nater20k/brass-exchange-users';
import firebase from 'firebase';
import { of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageApiService } from 'src/app/services/message/message-api.service';
import { UserApiService } from 'src/app/services/users/user-api.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss'],
})
export class CreateMessageComponent implements OnInit {
  @Input() threadId: string;
  @Input() inputRecipientUsername: string;
  messageFormGroup: FormGroup;
  userDoesNotExist = false;

  constructor(
    private messageApi: MessageApiService,
    private fb: FormBuilder,
    private auth: AuthService,
    private userApi: UserApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildMessageFormGroup();
  }

  sendMessage(): void {
    this.auth.user$
      .pipe(
        take(1),
        switchMap((user) =>
          this.inputRecipientUsername
            ? this.messageApi.threadManager(this.messageFromForm(user.displayName, this.threadId))
            : this.userApi.getUserByUsername(this.recipientUsername).pipe(
                switchMap((recipient) => {
                  if (recipient) {
                    return this.messageApi.threadManager(this.messageFromForm(user.displayName, this.threadId));
                  } else {
                    this.userDoesNotExist = true;
                    return of(null);
                  }
                })
              )
        )
      )
      .subscribe((threadId) => {
        if (!window.location.href.split('/')[5] && threadId) {
          this.router.navigate([`messages/thread/${threadId}`]);
        } else if (!this.userDoesNotExist) {
          this.buildMessageFormGroup();
        } else {
          this.messageFormGroup.get('recipientUsername').reset();
          document.getElementById('body').focus();
        }
      });
  }

  private messageFromForm(senderUsername: string, threadId: string): Message {
    return {
      body: this.messageFormGroup.get('body').value,
      sendDate: firebase.firestore.Timestamp.now(),
      sender: {
        username: senderUsername,
      },
      recipient: {
        username: this.recipientUsername,
        hasReadMessage: false,
      },
      threadId,
    };
  }

  get recipientUsername(): string {
    return this.inputRecipientUsername || this.messageFormGroup.get('recipientUsername').value;
  }

  get isBodyValid(): boolean {
    return this.messageFormGroup.get('body').valid;
  }

  private buildMessageFormGroup(): void {
    this.messageFormGroup = this.fb.group({
      body: this.fb.control('', Validators.required),
      sendDate: this.fb.control(''),
      hasBeenRead: this.fb.control(''),
      senderUsername: this.fb.control(''),
      recipientUsername: this.fb.control(''),
      threadId: this.fb.control(''),
    });
  }

  get newUsernameNeeded(): boolean {
    return !this.messageFormGroup.get('recipientUsername').dirty && this.userDoesNotExist;
  }
}
