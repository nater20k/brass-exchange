import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForSaleListing } from '@nater20k/brass-exchange-instruments';
import { ForSaleListingComponent } from './for-sale-listing.component';

describe('ForSaleListingComponent', () => {
  let component: ForSaleListingComponent;
  let fixture: ComponentFixture<ForSaleListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForSaleListingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForSaleListingComponent);
    component = fixture.componentInstance;
    component.instrument = setInstrument();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

const setInstrument = (): ForSaleListing => ({
  views: 10,
  favorites: 10,
  dateCreated: new Date(),
  isActive: true,
  isSold: false,
  isShippingAvailable: true,
  price: 1000,
  brand: 'BRAND',
  model: 'MODEL',
  key: 'KEY',
  manufactureDate: new Date(),
  sellerEmail: 'SELLER_EMAIL',
  sellerUsername: '',
  location: {
    city: 'CITY',
    state: 'STATE',
    zip: 'ZIP',
  },
  isCaseIncluded: true,
  description: 'DESCRIPTION',
  photoUrls: ['PHOTOURLS'],
  type: 'TYPE',
  finish: 'lacquer',
});
