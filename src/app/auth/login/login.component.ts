import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFormBuilderService, UserFormGroup } from '@nater20k/brass-exchange-users';
import { take } from 'rxjs/operators';
import { LOCATIONS, NavigationService } from 'src/app/services/navigation/navigation.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  loggedOut = false;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private navService: NavigationService,
    private formService: UserFormBuilderService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.authService.user$.pipe(take(1)).subscribe((user) => {
      if (!user) {
        this.loginFormGroup = this.formService.emailAndPasswordLoginForm();
        this.loggedOut = true;
      } else {
        this.navService.navigateTo(LOCATIONS.INSTRUMENTS.HOME);
      }
    });
  }

  emailLogin() {
    const userLogin = new UserFormGroup(this.loginFormGroup);

    this.authService
      .emailSignIn(userLogin)
      .pipe(take(1))
      .subscribe(() => {
        this.navService.navigateTo(LOCATIONS.INSTRUMENTS.HOME);
      });
  }

  googleLogin() {
    this.authService
      .googleSignIn()
      .pipe(take(1))
      .subscribe(() => {
        this.navService.navigateTo(LOCATIONS.INSTRUMENTS.HOME);
      });
  }

  get email() {
    return this.loginFormGroup.get('email');
  }

  get password() {
    return this.loginFormGroup.get('password');
  }
}
