import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Event } from '@angular/router';
import { BE } from '@nater20k/brass-exchange-constants';
import {
  Finish,
  FormBuilderService,
  ForSaleInstrumentListingFormGroup,
  InstrumentAdapterService,
} from '@nater20k/brass-exchange-instruments';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { InstrumentApiService } from 'src/app/services/instruments/instrument-api.service';
import { SubscriptionManager } from 'src/app/services/subscription-manager';
import { UploadService } from 'src/app/services/upload/upload.service';
import { UserApiService } from 'src/app/services/users/user-api.service';

@Component({
  selector: 'app-create-sell-instrument',
  templateUrl: './create-sell-instrument.component.html',
  styleUrls: ['./create-sell-instrument.component.scss'],
})
export class CreateSellInstrumentComponent extends SubscriptionManager implements OnInit {
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
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  buildFormGroup(): void {
    this.createSellFormGroup = new ForSaleInstrumentListingFormGroup(
      this.formBuilderService.createInstrumentForSaleFormGroup()
    );
    this.addUserEmailToForm();
  }

  uploadPhoto(instrumentId: string) {
    return this.auth.user$.pipe(take(1)).pipe(
      tap((user) => {
        this.storage.uploadAll({ files: this.images, userEmail: user.email, filePath: `/instruments/${instrumentId}` });
      })
    );
  }

  stagePhotos(event: any) {
    this.images = (event.target as HTMLInputElement).files;
  }

  submitCreateSell() {
    let newInstrumentId = '';
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

  addUserEmailToForm() {
    this.addSub = this.auth.user$
      .pipe(
        take(1),
        tap((user) => this.createSellFormGroup.formGroup.patchValue({ sellerEmail: user.email }))
      )
      .subscribe();
  }

  clearForm(): void {
    if (confirm('Are you sure you want to clear the form?')) {
      this.createSellFormGroup.formGroup.reset();
    }
  }

  toggleShowDetails(): void {
    this.showAddDetails = !this.showAddDetails;
  }

  clickUploadWorkaround() {
    document.getElementById('file').click();
  }
}
