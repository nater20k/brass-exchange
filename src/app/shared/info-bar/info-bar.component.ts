import { Component, OnInit, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { ForSaleListing } from '@nater20k/brass-exchange-instruments';
import { forkJoin } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { InstrumentApiService } from 'src/app/services/instruments/instrument-api.service';
import { UserApiService } from 'src/app/services/users/user-api.service';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss'],
})
export class InfoBarComponent implements OnInit {
  @Input() forSaleListing: ForSaleListing;
  // @Output()
  constructor(
    private auth: AuthService,
    private userApi: UserApiService,
    private instrumentApi: InstrumentApiService
  ) {}

  ngOnInit(): void {}

  contactSeller() {
    alert('Contact Seller');
  }

  augmentFavorite() {
    return this.auth.user$
      .pipe(
        take(1),
        switchMap((user) => {
          const isFavorited = this.isInstrumentFavorited(user?.favoritedInstruments);
          return forkJoin({
            augmentedFavoriteCount: isFavorited
              ? this.instrumentApi.removeFavoriteToForSaleListing(this.forSaleListing.id)
              : this.instrumentApi.addFavoriteToForSaleListing(this.forSaleListing.id),
            augmentedFavoriteInstrumentList: isFavorited
              ? this.userApi.removeFavoritedInstrumentFromUser(user.uid, this.forSaleListing)
              : this.userApi.addFavoritedInstrumentToUser(user.uid, this.forSaleListing),
          });
        })
      )
      .subscribe();
  }

  isInstrumentFavorited(forSaleListings: ForSaleListing[]): boolean {
    return forSaleListings
      ? forSaleListings.some((forSaleListing) => (forSaleListing.id = this.forSaleListing.id))
      : false;
  }
}
