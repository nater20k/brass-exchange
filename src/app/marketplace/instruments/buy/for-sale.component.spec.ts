import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { InstrumentApiService } from 'src/app/services/instruments/instrument-api.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { environment } from 'src/environments/environment';

import { ForSaleComponent } from './for-sale.component';

describe('ForSaleComponent', () => {
  let component: ForSaleComponent;
  let fixture: ComponentFixture<ForSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForSaleComponent],
      providers: [InstrumentApiService, NavigationService],
      imports: [AngularFireModule.initializeApp(environment.firebase), RouterTestingModule.withRoutes([])],
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
