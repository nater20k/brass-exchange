import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ContactSeller } from 'src/app/services/message-relay/message-relay.adapter';
import { MessageRelayService } from 'src/app/services/message-relay/message-relay.service';

@Component({
  selector: 'app-contact-seller',
  templateUrl: './contact-seller.component.html',
  styleUrls: ['./contact-seller.component.scss'],
})
export class ContactSellerComponent implements OnInit {
  contactSellerData: ContactSeller;
  constructor(private messageRelayService: MessageRelayService) {}
  @Input() sellerEmail: string;
  @Input() inquirerEmail: string;
  @Input() instrumentId: string;

  ngOnInit(): void {
    this.fetchContactSellerFormGroup();
  }

  fetchContactSellerFormGroup(): void {
    this.contactSellerData = this.messageRelayService.fetchContactSellerFormGroup({
      messageTo: this.sellerEmail,
      messageFrom: this.inquirerEmail,
    });
  }

  sendMessageToSeller() {
    if (this.contactSellerData.formGroup.get('messageContent').valid) {
      this.messageRelayService
        .sendMessageToSeller({
          messageTo: this.sellerEmail,
          messageFrom: this.inquirerEmail,
          messageContent: this.contactSellerData.messageContent,
          dateSent: new Date(),
          instrumentId: this.instrumentId,
          hasBeenRead: false,
        })
        .pipe(take(1))
        .subscribe(() => this.contactSellerData.formGroup.reset());
    }
  }

  clearForm() {
    if (this.messageContent.dirty) {
      if (confirm('Are you sure you want to clear the message form?')) {
        this.contactSellerData.formGroup.reset();
      }
    }
  }

  get messageContent(): AbstractControl {
    return this.contactSellerData.formGroup.get('messageContent');
  }
}
