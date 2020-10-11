import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForSaleListingComponent } from './for-sale-listing.component';

describe('ForSaleListingComponent', () => {
  let component: ForSaleListingComponent;
  let fixture: ComponentFixture<ForSaleListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForSaleListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForSaleListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
