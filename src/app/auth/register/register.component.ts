import { Component, OnInit } from '@angular/core';
import { BE } from '@nater20k/brass-exchange-constants';
import { UserFormBuilderService, UserFormGroup } from '@nater20k/brass-exchange-users';
import { LOCATIONS, NavigationService } from 'src/app/services/navigation/navigation.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationFormGroup: UserFormGroup;
  instruments = BE.INSTRUMENTS.BRASS.sort();

  constructor(
    private authService: AuthService,
    private userFormService: UserFormBuilderService,
    private navService: NavigationService
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    this.registrationFormGroup = new UserFormGroup(this.userFormService.registrationForm());
  }

  submitRegistration(): void {
    this.authService
      .emailRegister(this.registrationFormGroup)
      .subscribe(() => this.navService.navigateTo(LOCATIONS.INSTRUMENTS.HOME));
  }
}
