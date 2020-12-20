import { Component, Input, OnInit } from '@angular/core';
import { ForSaleListing } from '@nater20k/brass-exchange-instruments';
import { User } from '@nater20k/brass-exchange-users';
import { forkJoin } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
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
  @Input() displayContactSeller = false;
  isFavorited = false;
  user: User;

  constructor(
    private auth: AuthService,
    private userApi: UserApiService,
    private instrumentApi: InstrumentApiService
  ) {}

  ngOnInit(): void {
    this.auth.user$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.isFavorited = this.isInstrumentFavorited(user.favoritedInstruments);
    });
  }

  contactSeller(): void {
    this.displayContactSeller = !this.displayContactSeller;
  }

  augmentFavorite(): void {
    const localIsFavorited = this.isFavorited;
    this.isFavorited = !this.isFavorited;
    forkJoin({
      augmentedFavoriteCount: localIsFavorited
        ? this.instrumentApi.removeFavoriteToForSaleListing(this.forSaleListing.id)
        : this.instrumentApi.addFavoriteToForSaleListing(this.forSaleListing.id),
      augmentedFavoriteInstrumentList: localIsFavorited
        ? this.userApi.removeFavoritedInstrumentFromUser(this.user.uid, this.forSaleListing)
        : this.userApi.addFavoritedInstrumentToUser(this.user.uid, this.forSaleListing),
    })
      .pipe(
        take(1),
        catchError(() => {
          this.isFavorited = !this.isFavorited;
          return null;
        })
      )
      .subscribe();
  }

  isInstrumentFavorited(forSaleListings: ForSaleListing[]): boolean {
    return forSaleListings?.some((forSaleListing) => (forSaleListing.id = this.forSaleListing.id));
  }

  get instrumentName(): string {
    return `${this.forSaleListing.brand} ${this.forSaleListing.model}`;
  }
}
