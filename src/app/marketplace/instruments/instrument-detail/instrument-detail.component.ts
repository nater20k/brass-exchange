import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForSaleListing, Comment } from '@nater20k/brass-exchange-instruments';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { InstrumentApiService } from 'src/app/services/instruments/instrument-api.service';

@Component({
  templateUrl: './instrument-detail.component.html',
  styleUrls: ['./instrument-detail.component.scss'],
})
export class InstrumentDetailComponent implements OnInit {
  titleCasePipe = new TitleCasePipe();
  instrument$: Observable<ForSaleListing>;

  constructor(private router: Router, private instrumentApi: InstrumentApiService) {}

  ngOnInit(): void {
    this.setInstrument();
  }

  setInstrument(): void {
    this.instrument$ = this.instrumentApi.getInstrumentById(this.router.url.split('/')[3]);
  }

  addComment(comment: Comment) {
    this.instrumentApi.addCommentToForSaleListing(comment, this.router.url.split('/')[3]).pipe(take(1)).subscribe();
  }
}
