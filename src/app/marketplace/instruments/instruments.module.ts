import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ForSaleComponent } from './buy/for-sale.component';
import { InstrumentDetailComponent } from './instrument-detail/instrument-detail.component';
import { InstrumentsRoutingModule } from './instruments-routing.module';
import { InstrumentsComponent } from './instruments.component';
import { SellModule } from './sell/sell.module';

@NgModule({
  declarations: [InstrumentsComponent, ForSaleComponent, InstrumentDetailComponent],
  imports: [CommonModule, InstrumentsRoutingModule, SharedModule, SellModule],
  exports: [InstrumentsComponent],
})
export class InstrumentsModule {}
