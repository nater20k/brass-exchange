import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { InstrumentApiService } from 'src/app/services/instruments/instrument-api.service';
import { environment } from 'src/environments/environment';

import { InstrumentDetailComponent } from './instrument-detail.component';

describe('InstrumentDetailComponent', () => {
  let component: InstrumentDetailComponent;
  let fixture: ComponentFixture<InstrumentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstrumentDetailComponent],
      providers: [
        {
          provide: InstrumentApiService,
          useValue: {
            getInstrumentById: () => {},
          },
        },
      ],
      imports: [RouterTestingModule.withRoutes([]), AngularFireModule.initializeApp(environment.firebase)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
