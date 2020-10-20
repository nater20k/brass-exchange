import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserFormBuilderService, UserFormGroup } from '@nater20k/brass-exchange-users';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationFormGroup: UserFormGroup;
  constructor(private authService: AuthService, private userFormService: UserFormBuilderService) {}

  ngOnInit(): void {
    this.setForm();
    console.log(this.registrationFormGroup);
  }

  setForm() {
    this.registrationFormGroup = new UserFormGroup(this.userFormService.registrationForm());
  }

  submitRegistration() {
    console.log(this.registrationFormGroup);
    this.authService.emailRegister(this.registrationFormGroup);
  }
}
