import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentsRoutingModule } from './instruments-routing.module';
import { InstrumentsComponent } from './instruments.component';
import { ForSaleComponent } from './for-sale/for-sale.component';
import { ForSaleListingComponent } from './for-sale/for-sale-listing/for-sale-listing.component';
import { InstrumentDetailComponent } from './instrument-detail/instrument-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [InstrumentsComponent, ForSaleComponent, ForSaleListingComponent, InstrumentDetailComponent],
  imports: [CommonModule, InstrumentsRoutingModule, SharedModule],
})
export class InstrumentsModule {}
