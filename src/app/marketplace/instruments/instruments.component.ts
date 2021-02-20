import { Component } from '@angular/core';
import { locations, NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss'],
})
export class InstrumentsComponent {
  constructor(private navService: NavigationService) {}

  navigateToBuy(): void {
    this.navService.navigateTo(locations.instruments.buy);
  }

  navigateToSell(): void {
    this.navService.navigateTo(locations.instruments.sell);
  }
}
