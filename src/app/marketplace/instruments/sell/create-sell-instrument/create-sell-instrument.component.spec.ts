import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSellInstrumentComponent } from './create-sell-instrument.component';

describe('CreateSellInstrumentComponent', () => {
  let component: CreateSellInstrumentComponent;
  let fixture: ComponentFixture<CreateSellInstrumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSellInstrumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSellInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
