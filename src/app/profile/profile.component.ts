import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(console.log);
  }
}
