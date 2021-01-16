import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementaryInfoComponent } from './supplementary-info.component';

describe('SupplementaryInfoComponent', () => {
  let component: SupplementaryInfoComponent;
  let fixture: ComponentFixture<SupplementaryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplementaryInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
