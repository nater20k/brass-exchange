import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentsRoutingModule } from './instruments-routing.module';
import { InstrumentsComponent } from './instruments.component';


@NgModule({
  declarations: [InstrumentsComponent],
  imports: [
    CommonModule,
    InstrumentsRoutingModule
  ]
})
export class InstrumentsModule { }
