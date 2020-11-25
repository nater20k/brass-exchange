import { Component, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { LOCATIONS, NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() authenticated = false;
  isMenuOpen = false;
  constructor(public auth: AuthService, private navService: NavigationService) {}

  logout(): void {
    this.auth
      .signOut()
      .pipe(take(1))
      .subscribe(() => {
        this.isMenuOpen = false;
        this.navService.navigateTo(LOCATIONS.LOGIN);
      });
  }

  toggleMenu(option?: boolean): void {
    if (option !== undefined) {
      this.isMenuOpen = option;
    } else {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
}
