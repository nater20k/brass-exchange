import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  constructor(private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control(''),
    });
  }
}
