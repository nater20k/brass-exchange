import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BE } from '@nater20k/brass-exchange-constants';
import { User } from '@nater20k/brass-exchange-users';
import { Observable, of } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
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
  editUserFormGroup: Observable<FormGroup>;
  instruments = BE.INSTRUMENTS.BRASS.sort();
  userId: string;

  constructor(private fb: FormBuilder, private userApi: UserApiService, private sessionService: SessionService) {}

  ngOnInit(): void {
    this.editUserFormGroup = this.buildForm();
  }

  buildForm(): Observable<FormGroup> {
    return of(this.user).pipe(
      tap((user) => (this.userId = user.uid)),
      map((user) =>
        this.fb.group({
          firstName: this.fb.control(user.firstName, Validators.required),
          lastName: this.fb.control(user.lastName, Validators.required),
          displayName: this.fb.control(user.displayName, Validators.required),
          photoUrl: this.fb.control(user.photoUrl),
          email: this.fb.control(user.email, [Validators.required, Validators.email]),
          principalInstrument: this.fb.control(user.principalInstrument, Validators.required),
        })
      )
    );
  }

  submit(form: FormGroup) {
    if (form.dirty) {
      this.userApi
        .updateUser({ uid: this.userId, ...(form.value as Partial<User>) })
        .pipe(finalize(() => this.editSubmitted.emit()))
        .subscribe(() => {
          this.sessionService.deleteItemFromLocalStorage(keys.loggedInUser);
          this.user = null;
        });
    } else {
      this.editSubmitted.emit();
    }
  }

  goBack() {
    this.editSubmitted.emit();
  }
}
