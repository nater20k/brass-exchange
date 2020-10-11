import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForSaleListing } from '@nater20k/brass-exchange-instruments';
import { Observable } from 'rxjs';
import { InstrumentApiService } from 'src/app/services/instruments/instrument-api.service';

@Component({
  templateUrl: './instrument-detail.component.html',
  styleUrls: ['./instrument-detail.component.scss'],
})
export class InstrumentDetailComponent implements OnInit {
  titleCasePipe = new TitleCasePipe();
  instrument$: Observable<ForSaleListing>;

  constructor(
    private router: Router,
    private instrumentApi: InstrumentApiService
  ) {}

  ngOnInit(): void {
    this.instrument$ = this.instrumentApi.getInstrumentById(
      this.router.url.split('/')[3]
    );
  }
}
