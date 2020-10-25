import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ForSaleListing } from '@nater20k/brass-exchange-instruments';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { UserApiService } from 'src/app/services/users/user-api.service';

@Component({
  selector: 'app-list-sell-instruments',
  templateUrl: './list-sell-instruments.component.html',
  styleUrls: ['./list-sell-instruments.component.scss'],
})
export class ListSellInstrumentsComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  instrumentsListed: Observable<ForSaleListing[]>;
  constructor(private userApi: UserApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchInstrumentsListedByUser();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  fetchInstrumentsListedByUser() {
    this.subs.push(
      this.authService.user$.subscribe(
        (user) => (this.instrumentsListed = this.userApi.getInstrumentsForSaleByUser(user.uid))
      )
    );
  }
}
