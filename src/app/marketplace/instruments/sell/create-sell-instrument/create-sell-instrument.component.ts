import { Component, OnInit } from '@angular/core';
import { AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { BE } from '@nater20k/brass-exchange-constants';
import {
  Finish,
  FormBuilderService,
  ForSaleInstrumentListingFormGroup,
  InstrumentAdapterService,
} from '@nater20k/brass-exchange-instruments';
import { User } from '@nater20k/brass-exchange-users';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { InstrumentApiService } from 'src/app/services/instruments/instrument-api.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import { UserApiService } from 'src/app/services/users/user-api.service';

@Component({
  selector: 'app-create-sell-instrument',
  templateUrl: './create-sell-instrument.component.html',
  styleUrls: ['./create-sell-instrument.component.scss'],
})
export class CreateSellInstrumentComponent implements OnInit {
  createSellFormGroup: ForSaleInstrumentListingFormGroup;
  showAddDetails = false;
  genericInstruments = BE.INSTRUMENTS.BRASS.sort();
  finishes: Finish[] = ['raw', 'lacquer', 'silver'];
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  images: FileList;
  keys = ['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A']; // Move to common
  constructor(
    private formBuilderService: FormBuilderService,
    private instrumentApi: InstrumentApiService,
    private storage: UploadService,
    private auth: AuthService,
    private instrumentAdapter: InstrumentAdapterService,
    private userApi: UserApiService
  ) {}

  ngOnInit(): void {
    this.buildFormGroup();
  }

  buildFormGroup(): void {
    this.createSellFormGroup = new ForSaleInstrumentListingFormGroup(
      this.formBuilderService.createInstrumentForSaleFormGroup()
    );
    this.addUserEmailToForm().subscribe();
  }

  uploadPhoto(instrumentId: string): Observable<User> {
    return this.auth.user$.pipe(take(1)).pipe(
      tap((user) => {
        this.storage.uploadAll({ files: this.images, userEmail: user.email, filePath: `/instruments/${instrumentId}` });
      })
    );
  }

  stagePhotos(event: any): void {
    this.images = (event.target as HTMLInputElement).files;
  }

  submitCreateSell(): void {
    const instrument = this.instrumentAdapter.mapInstrumentForSaleFromInstrumentForSaleFormGroup(
      this.createSellFormGroup
    );

    this.auth.user$
      .pipe(
        take(1),
        switchMap((user) => {
          return this.instrumentApi.createForSaleInstrument(instrument).pipe(
            switchMap((forSale) => {
              return this.uploadPhoto(forSale.id).pipe(map(() => forSale.id));
            }),
            switchMap((id) => {
              return this.userApi.addToPersonalInstrumentsListed(user.uid, { ...instrument, id });
            })
          );
        })
      )
      .subscribe();
  }

  addUserEmailToForm(): Observable<User> {
    return this.auth.user$.pipe(
      take(1),
      tap((user) => this.createSellFormGroup.formGroup.patchValue({ sellerEmail: user.email }))
    );
  }

  clearForm(): void {
    if (confirm('Are you sure you want to clear the form?')) {
      this.createSellFormGroup.formGroup.reset();
    }
  }

  toggleShowDetails(): void {
    this.showAddDetails = !this.showAddDetails;
  }

  clickUploadWorkaround(): void {
    document.getElementById('file').click();
  }
}
