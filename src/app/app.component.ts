import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { locations, NavigationService } from './services/navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'brass-exchange';
  constructor(public auth: AuthService, private navService: NavigationService) {}

  ngOnInit(): void {
    this.auth.user$.pipe(take(1)).subscribe((user) => {
      if (!user) {
        this.navService.navigateTo(locations.login);
      }
    });
  }
}
