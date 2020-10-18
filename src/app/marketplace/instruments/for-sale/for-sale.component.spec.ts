import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumentApiService } from 'src/app/services/instruments/instrument-api.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

import { ForSaleComponent } from './for-sale.component';

describe('ForSaleComponent', () => {
  let component: ForSaleComponent;
  let fixture: ComponentFixture<ForSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForSaleComponent],
      providers: [InstrumentApiService, NavigationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
