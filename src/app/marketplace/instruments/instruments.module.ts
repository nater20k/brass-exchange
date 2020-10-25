import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentsRoutingModule } from './instruments-routing.module';
import { InstrumentsComponent } from './instruments.component';
import { ForSaleComponent } from './buy/for-sale.component';
import { InstrumentDetailComponent } from './instrument-detail/instrument-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { SellModule } from './sell/sell.module';

@NgModule({
  declarations: [InstrumentsComponent, ForSaleComponent, InstrumentDetailComponent],
  imports: [CommonModule, InstrumentsRoutingModule, SharedModule, SellModule],
})
export class InstrumentsModule {}
