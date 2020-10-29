import { Component, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { InstrumentApiService } from 'src/app/services/instruments/instrument-api.service';
import { SubscriptionManager } from 'src/app/services/subscription-manager';
import { UploadService } from 'src/app/services/upload/upload.service';

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
    private instrumentAdapter: InstrumentAdapterService
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
        this.storage.upload(this.images, user.email, `/instruments/${instrumentId}`);
      })
    );
  }

  stagePhotos(event: any) {
    this.images = (<HTMLInputElement>event.target).files;
  }

  submitCreateSell() {
    let newInstrumentId = '';
    const instrument = this.instrumentAdapter.mapInstrumentForSaleFromInstrumentForSaleFormGroup(
      this.createSellFormGroup
    );
    this.addSub = this.instrumentApi
      .createForSaleInstrument(instrument)
      .pipe(
        switchMap((instrument) => {
          newInstrumentId = instrument.id;
          return this.uploadPhoto(newInstrumentId);
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
