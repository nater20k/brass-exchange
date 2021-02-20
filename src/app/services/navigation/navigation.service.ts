import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateTo(location: string): void {
    this.router.navigate([location]);
  }
}

export const locations = {
  instruments: {
    home: 'instruments',
    buy: 'instruments/for-sale',
    sell: 'instruments/sell',
    detail: (id: string) => `instruments/detail/${id}`,
  },
  services: 'services',
  login: 'login',
};
