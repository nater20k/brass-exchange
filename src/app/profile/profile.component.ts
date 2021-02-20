import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ForSaleListingComponentConfig } from '../marketplace/instruments/buy/for-sale-listing/for-sale-listing.component';
import { locations, NavigationService } from '../services/navigation/navigation.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  isEditMode = false;
  forSaleListingComponentConfig: ForSaleListingComponentConfig = {
    simple: true,
  };

  constructor(public auth: AuthService, private navigationService: NavigationService) {}

  navigateToDetail(id: string) {
    this.navigationService.navigateTo(locations.instruments.detail(id));
  }
}
