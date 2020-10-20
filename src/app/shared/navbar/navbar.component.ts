import { Component, Input, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { LOCATIONS, NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  menuBars = faBars;
  @Input() authenticated = false;
  isMenuOpen = false;
  constructor(public auth: AuthService, private navService: NavigationService) {}

  ngOnInit(): void {}
  login() {}

  logout() {
    this.auth
      .signOut()
      .pipe(take(1))
      .subscribe(
        () => {
          this.isMenuOpen = false;
          this.navService.navigateTo(LOCATIONS.LOGIN);
        },
        () => {},
        () => {
          console.log('complete');
        }
      );
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
