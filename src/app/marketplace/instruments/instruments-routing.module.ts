import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstrumentsComponent } from './instruments.component';

const routes: Routes = [{ path: '', component: InstrumentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstrumentsRoutingModule { }
