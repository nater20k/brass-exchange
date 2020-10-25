import { Component, OnInit } from '@angular/core';
import { LOCATIONS, NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss'],
})
export class InstrumentsComponent {
  constructor(private navService: NavigationService) {}

  navigateToBuy(): void {
    this.navService.navigateTo(LOCATIONS.INSTRUMENTS.BUY);
  }

  navigateToSell(): void {
    this.navService.navigateTo(LOCATIONS.INSTRUMENTS.SELL);
  }
}
