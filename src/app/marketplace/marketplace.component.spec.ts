import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationService } from '../services/navigation/navigation.service';

import { MarketplaceComponent } from './marketplace.component';

describe('MarketplaceComponent', () => {
  let component: MarketplaceComponent;
  let fixture: ComponentFixture<MarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketplaceComponent],
      providers: [NavigationService],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
