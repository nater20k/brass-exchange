import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../services/navigation/navigation.service';
import { LOCATIONS } from '../services/navigation/navigation.service';
@Component({
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent implements OnInit {
  constructor(private navService: NavigationService) {}

  ngOnInit(): void {}

  navigateToInstruments(): void {
    this.navService.navigateTo(LOCATIONS.INSTRUMENTS.HOME);
  }

  navigateToServices(): void {
    this.navService.navigateTo(LOCATIONS.services);
  }
}
