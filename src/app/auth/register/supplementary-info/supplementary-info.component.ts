import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BE } from '@nater20k/brass-exchange-constants';
import { UserFormGroup } from '@nater20k/brass-exchange-users';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { locations, NavigationService } from 'src/app/services/navigation/navigation.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-supplementary-info',
  templateUrl: './supplementary-info.component.html',
  styleUrls: ['./supplementary-info.component.scss'],
})
export class SupplementaryInfoComponent implements OnInit {
  @Input() partialUser: Observable<firebase.auth.UserCredential>;
  instruments = BE.INSTRUMENTS.BRASS.sort();
  registrationFormGroup: UserFormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.partialUser.pipe(take(1)).subscribe((user) => {
      this.registrationFormGroup = new UserFormGroup(this.buildRegistrationForm(user));
    });
  }

  buildRegistrationForm({ additionalUserInfo }: firebase.auth.UserCredential): FormGroup {
    return this.fb.group({
      displayName: this.fb.control('', Validators.required),
      instrument: this.fb.control('', Validators.required),
      firstName: this.fb.control((additionalUserInfo.profile as any).given_name),
      lastName: this.fb.control((additionalUserInfo.profile as any).family_name),
    });
  }

  submit() {
    this.partialUser
      .pipe(
        take(1),
        switchMap((user) => this.authService.updateUserData(user, this.registrationFormGroup))
      )
      .pipe(take(1))
      .subscribe(() => this.navigationService.navigateTo(locations.instruments.home));
  }
}
