import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateTo(location: string) {
    this.router.navigate([location]);
  }
}

export const LOCATIONS = {
  INSTRUMENTS: {
    HOME: 'instruments',
    BUY: 'instruments/for-sale',
    SELL: 'instruments',
    DETAIL: (id: string) => `instruments/detail/${id}`,
  },
  services: 'services',
};
