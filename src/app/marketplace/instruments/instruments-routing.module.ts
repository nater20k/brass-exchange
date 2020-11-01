import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForSaleComponent } from './buy/for-sale.component';
import { InstrumentDetailComponent } from './instrument-detail/instrument-detail.component';
import { InstrumentsComponent } from './instruments.component';
import { SellComponent } from './sell/sell.component';

const routes: Routes = [
  { path: '', component: InstrumentsComponent },
  { path: 'for-sale', component: ForSaleComponent },
  { path: 'detail/:id', component: InstrumentDetailComponent },
  { path: 'sell', component: SellComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstrumentsRoutingModule {}
