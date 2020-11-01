import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent implements OnInit {
  sellOption: SellInterface = 'list';
  constructor() {}

  ngOnInit(): void {}

  switchView(option: SellInterface) {
    this.sellOption = option;
  }
}

type SellInterface = 'create' | 'list';
