import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation/navigation.service';
import { LOCATIONS } from '../services/navigation/navigation.service';
@Component({
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent {
  constructor(private navService: NavigationService) {}

  navigateToInstruments(): void {
    this.navService.navigateTo(LOCATIONS.INSTRUMENTS.HOME);
  }

  navigateToServices(): void {
    this.navService.navigateTo(LOCATIONS.services);
  }
}
