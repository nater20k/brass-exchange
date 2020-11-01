import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Finish, ForSaleListing, TubaSize } from '@nater20k/brass-exchange-instruments';

@Component({
  selector: 'app-for-sale-listing',
  templateUrl: './for-sale-listing.component.html',
  styleUrls: ['./for-sale-listing.component.scss'],
})
export class ForSaleListingComponent {
  @Input() instrument: ForSaleListing;
  titleCasePipe = new TitleCasePipe();

  get instrumentId(): string {
    return this.instrument.id;
  }

  get brand(): string {
    return this.titleCasePipe.transform(this.instrument.brand);
  }

  get model(): string {
    return this.instrument.model;
  }

  get brandModel(): string {
    return this.brand && this.model ? `${this.brand} - ${this.model}` : this.brand;
  }

  get type(): string {
    return this.instrument.type;
  }

  get price(): number {
    return this.instrument.price;
  }

  get heroPhotoUrl(): string {
    return this.instrument.photoUrls[0];
  }

  get description(): string {
    return this.instrument.description.length > 80
      ? `${this.instrument.description.substr(0, 80)}...`
      : this.instrument.description;
  }

  get key(): string {
    return this.instrument.key;
  }

  get boreSize(): number {
    return this.instrument.boreSize;
  }

  get size(): TubaSize {
    return this.instrument.size;
  }

  get isShippingAvailable(): string {
    return this.instrument.isShippingAvailable ? 'Yes' : 'No';
  }

  get isCaseIncluded(): string {
    return this.instrument.isCaseIncluded ? 'Yes' : 'No';
  }

  get finish(): Finish {
    return this.instrument.finish;
  }

  get views(): number {
    return this.instrument.views;
  }

  get sellerEmail(): string {
    return this.instrument.sellerEmail;
  }
}
