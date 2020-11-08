import { FormGroup } from '@angular/forms';

export class ContactSeller {
  constructor(readonly formGroup: FormGroup) {}

  get messageTo() {
    return this.formGroup.get('messageTo').value || '';
  }

  get messageFrom() {
    return this.formGroup.get('messageFrom').value || '';
  }

  get messageContent() {
    return this.formGroup.get('messageContent').value || '';
  }

  get sentDate() {
    return this.formGroup.get('sentDate').value || '';
  }
}
