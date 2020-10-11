import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForSaleComponent } from './for-sale/for-sale.component';
import { InstrumentDetailComponent } from './instrument-detail/instrument-detail.component';
import { InstrumentsComponent } from './instruments.component';

const routes: Routes = [
  { path: '', component: InstrumentsComponent },
  { path: 'for-sale', component: ForSaleComponent },
  { path: 'detail/:id', component: InstrumentDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstrumentsRoutingModule {}
