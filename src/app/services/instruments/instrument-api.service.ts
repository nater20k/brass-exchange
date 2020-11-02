import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BE } from '@nater20k/brass-exchange-constants';
import {
  ForSaleListing,
  Instrument,
  Comment,
  ForSaleInstrumentListingFormGroup,
} from '@nater20k/brass-exchange-instruments';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InstrumentApiService {
  constructor(private afs: AngularFirestore) {}
  instrumentPath = this.afs.collection<ForSaleListing>('instruments-for-sale');

  getGenericInstruments(): Observable<string[]> {
    return of(BE.INSTRUMENTS.BRASS).pipe(map((instruments) => instruments.sort()));
  }

  // CREATE
  createForSaleInstrument(instrument: ForSaleListing): Observable<DocumentReference> {
    return from(this.instrumentPath.add(instrument));
  }

  // READ
  getAllInstruments(): Observable<ForSaleListing[]> {
    return this.instrumentPath.valueChanges({ idField: 'id' });
  }

  getAllForSaleInstruments(): Observable<ForSaleListing[]> {
    return this.instrumentPath.valueChanges({ idField: 'id' });
  }

  getInstrumentById(id: string): Observable<ForSaleListing> {
    return this.instrumentPath
      .doc<ForSaleListing>(id)
      .valueChanges()
      .pipe(map((instrument) => (instrument = { ...instrument, id })));
  }

  getInstrumentsByType(type: string): Observable<ForSaleListing[]> {
    return this.instrumentPath
      .valueChanges()
      .pipe(map((instruments) => instruments.filter((instrument) => (instrument.type = type))));
  }

  getInstrumentsLessThanAmount(maxAmount: number): Observable<ForSaleListing[]> {
    return this.instrumentPath
      .valueChanges()
      .pipe(map((instruments) => instruments.filter((instrument) => instrument.price < maxAmount)));
  }

  getInstrumentsMoreThanAmount(minAmount: number): Observable<ForSaleListing[]> {
    return this.instrumentPath
      .valueChanges()
      .pipe(map((instruments) => instruments.filter((instrument) => instrument.price > minAmount)));
  }

  getInstrumentsWithinBothAmounts(minAmount: number, maxAmount: number): Observable<ForSaleListing[]> {
    return this.instrumentPath
      .valueChanges()
      .pipe(
        map((instruments) =>
          instruments.filter((instrument) => instrument.price > minAmount && instrument.price < maxAmount)
        )
      );
  }

  getInstrumentsByBrand(brand: string): Observable<ForSaleListing[]> {
    return this.instrumentPath
      .valueChanges()
      .pipe(
        map((instruments) => instruments.filter((instrument) => instrument.brand.toLowerCase() === brand.toLowerCase()))
      );
  }

  // UPDATE
  updateInstrument(instrument: Partial<Instrument>): Observable<void> {
    return from(this.instrumentPath.doc(instrument.id).update(instrument));
  }

  updateForSaleListing(instrument: Partial<Instrument>): Observable<void> {
    return from(this.instrumentPath.doc(instrument.id).update(instrument));
  }

  // DELETE
  deleteInstrument(id: string): Observable<void> {
    return from(this.instrumentPath.doc(id).delete());
  }

  deactivateInstrument(id: string): Observable<void> {
    return from(this.instrumentPath.doc(id).set({ isActive: false }));
  }

  activateInstrument(id: string): Observable<void> {
    return from(this.instrumentPath.doc(id).set({ isActive: true }));
  }

  // COMMENT SECTION

  addCommentToForSaleListing(comment: Comment, instrumentId: string) {
    return this.getInstrumentById(instrumentId).pipe(
      take(1),
      switchMap((instrument) => {
        instrument?.comments?.length > 0 ? instrument.comments.push(comment) : (instrument.comments = [comment]);
        return this.updateInstrument(instrument);
      })
    );
  }
}
