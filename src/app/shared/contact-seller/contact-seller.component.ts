import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Message } from '@nater20k/brass-exchange-users';
import firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { MessageApiService } from 'src/app/services/message/message-api.service';
import { UserApiService } from 'src/app/services/users/user-api.service';

@Component({
  selector: 'app-contact-seller',
  templateUrl: './contact-seller.component.html',
  styleUrls: ['./contact-seller.component.scss'],
})
export class ContactSellerComponent implements OnInit, AfterViewInit {
  @Input() sellerId: string;
  @Input() inquirerUsername: string;
  @Input() instrumentId: string;
  @Input() instrumentName: string;
  @Output() closeMessageComponent: EventEmitter<void> = new EventEmitter();

  formGroup: FormGroup;
  messageSentSuccessfully = false;
  messageError = false;
  closeContactTimeout = 3000;

  constructor(private fb: FormBuilder, private messageApi: MessageApiService, private userApi: UserApiService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('body').focus();
  }

  buildForm(): void {
    this.formGroup = this.fb.group({
      seller: this.fb.control(this.sellerId),
      inquirerUsername: this.fb.control(this.inquirerUsername),
      instrumentId: this.fb.control(this.instrumentId),
      body: this.fb.control(''),
    });
  }

  sendMessage(): void {
    this.fetchSellerUsername(this.sellerId)
      .pipe(
        take(1),
        switchMap((sellerUsername) =>
          this.messageApi.threadManager(this.messageAdapter(this.inquirerUsername, sellerUsername)).pipe(
            take(1),
            tap(() => {
              this.messageSentSuccessfully = true;
              this.clearForm(false);
              setTimeout(() => {
                this.closeMessageComponent.emit();
              }, this.closeContactTimeout);
            }),
            catchError(() => {
              this.messageError = true;
              return of(null);
            })
          )
        )
      )
      .subscribe();
  }

  clearForm(confirmation: boolean = true): void {
    if (confirmation) {
      if (this.messageBody.dirty && this.messageBody.value !== '') {
        if (confirm('Are you sure you want to clear the message form?')) {
          this.messageBody.reset();
          document.getElementById('body').focus();
        }
      }
    } else {
      this.messageBody.reset();
    }
  }

  fetchSellerUsername(sellerId: string): Observable<string> {
    return this.userApi.getSingleUser(sellerId).pipe(map((user) => user.displayName));
  }

  private messageAdapter(senderUsername: string, sellerUsername: string, threadId: string = ''): Message {
    return {
      body: `Message in regards to ${this.instrumentName}. ${this.messageBody.value}`,
      sendDate: firebase.firestore.Timestamp.now(),
      sender: {
        username: senderUsername,
      },
      recipient: {
        username: sellerUsername,
        hasReadMessage: false,
      },
      threadId,
    };
  }

  get messageBody(): AbstractControl {
    return this.formGroup.get('body');
  }
}
