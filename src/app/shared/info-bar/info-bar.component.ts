import { Component, OnInit, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { ForSaleListing } from '@nater20k/brass-exchange-instruments';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss'],
})
export class InfoBarComponent implements OnInit {
  @Input() forSaleListing: ForSaleListing;
  // @Output()
  constructor() {}

  ngOnInit(): void {}

  contactSeller() {
    alert('Contact Seller');
  }
}
