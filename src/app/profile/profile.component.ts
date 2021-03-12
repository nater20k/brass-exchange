import { Component, OnInit } from '@angular/core';
import { User } from '@nater20k/brass-exchange-users';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ForSaleListingComponentConfig } from '../marketplace/instruments/buy/for-sale-listing/for-sale-listing.component';
import { locations, NavigationService } from '../services/navigation/navigation.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isEditMode = false;
  forSaleListingComponentConfig: ForSaleListingComponentConfig = {
    simple: true,
  };

  user$: Observable<User>;

  constructor(public auth: AuthService, private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.user$ = this.auth.user$.pipe(
      map((user) => ({
        ...user,
        dateAccountCreated: new Date((user.dateAccountCreated as any).seconds * 1000),
      }))
    );
  }

  navigateToDetail(id: string) {
    this.navigationService.navigateTo(locations.instruments.detail(id));
  }
}
