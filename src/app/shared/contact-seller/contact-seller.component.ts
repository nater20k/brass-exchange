import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Message } from '@nater20k/brass-exchange-users';
import { of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { MessageApiService } from 'src/app/services/message/message-api.service';

@Component({
  selector: 'app-contact-seller',
  templateUrl: './contact-seller.component.html',
  styleUrls: ['./contact-seller.component.scss'],
})
export class ContactSellerComponent implements OnInit, AfterViewInit {
  @Input() sellerUsername: string;
  @Input() inquirerUsername: string;
  @Input() instrumentId: string;
  @Input() instrumentName: string;
  @Output() closeMessageComponent: EventEmitter<void> = new EventEmitter();

  formGroup: FormGroup;
  messageSentSuccessfully = false;
  messageError = false;
  closeContactTimeout = 5000;

  constructor(private fb: FormBuilder, private messageApi: MessageApiService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('body').focus();
  }

  buildForm(): void {
    this.formGroup = this.fb.group({
      seller: this.fb.control(this.sellerUsername),
      inquirerUsername: this.fb.control(this.inquirerUsername),
      instrumentId: this.fb.control(this.instrumentId),
      body: this.fb.control(''),
    });
  }

  sendMessage(): void {
    this.messageApi
      .threadManager(this.messageAdapter(this.inquirerUsername))
      .pipe(
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

  private messageAdapter(senderUsername: string, threadId: string = ''): Message {
    return {
      body: `Message in regards to ${this.instrumentName}. ${this.messageBody.value}`,
      sendDate: new Date(),
      sender: {
        username: senderUsername,
      },
      recipient: {
        username: this.sellerUsername,
        hasReadMessage: false,
      },
      threadId,
    };
  }

  get messageBody(): AbstractControl {
    return this.formGroup.get('body');
  }
}
