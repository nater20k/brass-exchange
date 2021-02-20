import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BE } from '@nater20k/brass-exchange-constants';
import { User } from '@nater20k/brass-exchange-users';
import { keys, SessionService } from 'src/app/services/session.service';
import { UserApiService } from 'src/app/services/users/user-api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Output() editSubmitted: EventEmitter<void> = new EventEmitter();
  @Input() user: User;
  editUserFormGroup: FormGroup;
  instruments = BE.INSTRUMENTS.BRASS.sort();
  constructor(private fb: FormBuilder, private userApi: UserApiService, private sessionService: SessionService) {}

  ngOnInit(): void {
    this.editUserFormGroup = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      firstName: this.fb.control(this.user.firstName, Validators.required),
      lastName: this.fb.control(this.user.lastName, Validators.required),
      displayName: this.fb.control(this.user.displayName, Validators.required),
      email: this.fb.control(this.user.email, [Validators.required, Validators.email]),
      principalInstrument: this.fb.control(this.user.principalInstrument, Validators.required),
    });
  }

  submit() {
    if (this.editUserFormGroup.dirty) {
      console.log({ uid: this.user.uid, ...(this.editUserFormGroup.value as Partial<User>) });
      this.userApi
        .updateUser({ uid: this.user.uid, ...(this.editUserFormGroup.value as Partial<User>) })
        .subscribe(() => {
          this.sessionService.deleteItemFromLocalStorage(keys.loggedInUser);
          this.editSubmitted.emit();
          this.user = null;
        });
    } else {
      console.log('ELSE');
    }
  }
}
