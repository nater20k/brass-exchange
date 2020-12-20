import { Component } from '@angular/core';
import { InstrumentApiService } from 'src/app/services/instruments/instrument-api.service';
import { locations, NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-for-sale',
  templateUrl: './for-sale.component.html',
  styleUrls: ['./for-sale.component.scss'],
})
export class ForSaleComponent {
  instrumentsForSale = this.instrumentApi.getAllForSaleInstruments();

  constructor(private instrumentApi: InstrumentApiService, private navService: NavigationService) {}

  navigateToDetail(id: string): void {
    this.navService.navigateTo(locations.instruments.detail(id));
  }
}
