import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { locations, NavigationService } from 'src/app/services/navigation/navigation.service';

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
      .pipe(
        tap(() => {
          this.navService.navigateTo(locations.login);
          this.isMenuOpen = false;
        })
      )
      .subscribe();
  }

  toggleMenu(option?: boolean): void {
    if (option !== undefined) {
      this.isMenuOpen = option;
    } else {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
}
