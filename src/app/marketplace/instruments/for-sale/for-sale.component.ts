import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InstrumentApiService } from 'src/app/services/instruments/instrument-api.service';

@Component({
  selector: 'app-for-sale',
  templateUrl: './for-sale.component.html',
  styleUrls: ['./for-sale.component.scss'],
})
export class ForSaleComponent {
  constructor(
    private instrumentApi: InstrumentApiService,
    private router: Router
  ) {}
  instrumentsForSale = this.instrumentApi.getAllForSaleInstruments();

  navigateToDetail(id: string): Promise<boolean> {
    return this.router.navigate([`instruments/detail/${id}`]);
  }
}
