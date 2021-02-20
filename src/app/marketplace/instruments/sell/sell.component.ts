import { Component } from '@angular/core';

@Component({
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent {
  sellOption: SellInterface = 'list';

  switchView(option: SellInterface): void {
    this.sellOption = option;
  }
}

type SellInterface = 'create' | 'list';
