import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { BE } from '@nater20k/brass-exchange-constants';
import { FormBuilderService, ForSaleInstrumentListingFormGroup } from '@nater20k/brass-exchange-instruments';

@Component({
  selector: 'app-create-sell-instrument',
  templateUrl: './create-sell-instrument.component.html',
  styleUrls: ['./create-sell-instrument.component.scss'],
})
export class CreateSellInstrumentComponent implements OnInit {
  createSellFormGroup: ForSaleInstrumentListingFormGroup;
  genericInstruments = BE.INSTRUMENTS.BRASS.sort();
  constructor(private formBuilderService: FormBuilderService) {}

  ngOnInit(): void {
    this.buildFormGroup();
  }

  buildFormGroup(): void {
    this.createSellFormGroup = new ForSaleInstrumentListingFormGroup(
      this.formBuilderService.createInstrumentForSaleFormGroup()
    );
  }

  submitCreateSell() {
    console.log(this.createSellFormGroup);
  }

  clearForm(): void {
    if (confirm('Are you sure you want to clear the form?')) {
      this.createSellFormGroup.formGroup.reset();
    }
  }

  get price(): AbstractControl {
    console.log(this.createSellFormGroup.formGroup.get('price'));
    return this.createSellFormGroup.formGroup.get('price');
  }
}
