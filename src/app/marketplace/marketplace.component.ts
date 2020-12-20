import { Component } from '@angular/core';
import { locations, NavigationService } from '../services/navigation/navigation.service';
@Component({
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent {
  constructor(private navService: NavigationService) {}

  navigateToInstruments(): void {
    this.navService.navigateTo(locations.instruments.home);
  }

  navigateToServices(): void {
    this.navService.navigateTo(locations.services);
  }
}
