import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSellInstrumentsComponent } from './list-sell-instruments.component';

describe('ListSellInstrumentsComponent', () => {
  let component: ListSellInstrumentsComponent;
  let fixture: ComponentFixture<ListSellInstrumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSellInstrumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSellInstrumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
