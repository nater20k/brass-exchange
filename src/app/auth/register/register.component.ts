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
  }

  setForm() {
    this.registrationFormGroup = new UserFormGroup(this.userFormService.registrationForm());
  }

  submitRegistration() {
    this.authService.emailRegister(this.registrationFormGroup);
  }
}
