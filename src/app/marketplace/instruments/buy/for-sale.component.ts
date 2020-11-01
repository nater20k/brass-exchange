import { Component } from '@angular/core';
import { InstrumentApiService } from 'src/app/services/instruments/instrument-api.service';
import { LOCATIONS, NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-for-sale',
  templateUrl: './for-sale.component.html',
  styleUrls: ['./for-sale.component.scss'],
})
export class ForSaleComponent {
  constructor(private instrumentApi: InstrumentApiService, private navService: NavigationService) {}
  instrumentsForSale = this.instrumentApi.getAllForSaleInstruments();

  navigateToDetail(id: string): void {
    this.navService.navigateTo(LOCATIONS.INSTRUMENTS.DETAIL(id));
  }
}
