import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { UserFormBuilderService, UserFormGroup } from '@nater20k/brass-exchange-users';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { locations, NavigationService } from 'src/app/services/navigation/navigation.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  loggedOut = false;
  loginError = false;
  supplementaryInfoNeeded = false; // TODO Change me
  partialUser: Observable<firebase.auth.UserCredential>;

  constructor(
    public authService: AuthService,
    private navService: NavigationService,
    private formService: UserFormBuilderService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.authService.user$.pipe(take(1)).subscribe((user) => {
      if (!user) {
        this.loginFormGroup = this.formService.emailAndPasswordLoginForm();
        this.loggedOut = true;
      } else {
        this.navService.navigateTo(locations.instruments.home);
      }
    });
  }

  emailLogin(): void {
    this.loginError = false;
    const userLogin = new UserFormGroup(this.loginFormGroup);
    this.authService
      .emailSignIn(userLogin)
      .pipe(take(1))
      .subscribe(
        () => this.navService.navigateTo(locations.instruments.home),
        () => {
          this.loginError = true;
          this.loginFormGroup.reset();
        },
        () => {}
      );
  }

  googleLogin(): void {
    this.authService
      .googleSignIn()
      .pipe(take(1))
      .subscribe((user) => {
        if (user.additionalUserInfo.isNewUser) {
          this.partialUser = of(user);
          this.supplementaryInfoNeeded = true;
        } else {
          this.navService.navigateTo(locations.instruments.home);
        }
      });
  }

  forgotPassword(): void {
    alert('TODO');
  }

  get email(): AbstractControl {
    return this.loginFormGroup.get('email');
  }

  get password(): AbstractControl {
    return this.loginFormGroup.get('password');
  }
}
