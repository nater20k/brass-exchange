import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellComponent } from './sell.component';
import { CreateSellInstrumentComponent } from './create-sell-instrument/create-sell-instrument.component';
import { ListSellInstrumentsComponent } from './list-sell-instruments/list-sell-instruments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SellComponent, CreateSellInstrumentComponent, ListSellInstrumentsComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
})
export class SellModule {}
