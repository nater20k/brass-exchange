import { Component, OnInit } from '@angular/core';
import { ForSaleListing } from '@nater20k/brass-exchange-instruments';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { UserApiService } from 'src/app/services/users/user-api.service';

@Component({
  selector: 'app-list-sell-instruments',
  templateUrl: './list-sell-instruments.component.html',
  styleUrls: ['./list-sell-instruments.component.scss'],
})
export class ListSellInstrumentsComponent implements OnInit {
  instrumentsList: Observable<ForSaleListing[]>;
  constructor(private userApi: UserApiService, private authService: AuthService) {}

  ngOnInit() {
    this.fetchInstrumentsListedByUser();
  }

  fetchInstrumentsListedByUser() {
    this.instrumentsList = this.authService.user$.pipe(
      switchMap((user) => this.userApi.getInstrumentsForSaleByUser(user.uid))
    );
  }
}
