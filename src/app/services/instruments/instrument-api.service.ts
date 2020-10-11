import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BE } from '@nater20k/brass-exchange-constants';
import {
  ForSaleListing,
  Instrument,
} from '@nater20k/brass-exchange-instruments';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InstrumentApiService {
  constructor(private afs: AngularFirestore) {}
  instrumentPath = this.afs.collection<ForSaleListing>('instruments-for-sale');

  getGenericInstruments(): Observable<string[]> {
    return of(BE.INSTRUMENTS.BRASS).pipe(
      map((instruments) => instruments.sort())
    );
  }

  // CREATE
  createForSaleInstrument(
    instrument: ForSaleListing
  ): Observable<DocumentReference> {
    return from(this.instrumentPath.add(instrument)).pipe(
      catchError(() => of(null))
    );
  }

  // READ
  getAllInstruments(): Observable<ForSaleListing[]> {
    return this.instrumentPath
      .valueChanges({ idField: 'id' })
      .pipe(catchError(() => of([])));
  }

  getAllForSaleInstruments(): Observable<ForSaleListing[]> {
    return this.instrumentPath
      .valueChanges({ idField: 'id' })
      .pipe(catchError(() => of([])));
  }

  getInstrumentById(id: string): Observable<ForSaleListing> {
    return this.instrumentPath
      .doc<ForSaleListing>(id)
      .valueChanges()
      .pipe(catchError(() => of(null)));
  }

  getInstrumentsByType(type: string): Observable<ForSaleListing[]> {
    return this.instrumentPath.valueChanges().pipe(
      map((instruments) =>
        instruments.filter((instrument) => (instrument.type = type))
      ),
      catchError(() => of([]))
    );
  }

  getInstrumentsLessThanAmount(
    maxAmount: number
  ): Observable<ForSaleListing[]> {
    return this.instrumentPath.valueChanges().pipe(
      map((instruments) =>
        instruments.filter((instrument) => instrument.price < maxAmount)
      ),
      catchError(() => of([]))
    );
  }

  getInstrumentsMoreThanAmount(
    minAmount: number
  ): Observable<ForSaleListing[]> {
    return this.instrumentPath.valueChanges().pipe(
      map((instruments) =>
        instruments.filter((instrument) => instrument.price > minAmount)
      ),
      catchError(() => of([]))
    );
  }

  getInstrumentsWithinBothAmounts(
    minAmount: number,
    maxAmount: number
  ): Observable<ForSaleListing[]> {
    return this.instrumentPath.valueChanges().pipe(
      map((instruments) =>
        instruments.filter(
          (instrument) =>
            instrument.price > minAmount && instrument.price < maxAmount
        )
      ),
      catchError(() => of([]))
    );
  }

  getInstrumentsByBrand(brand: string): Observable<ForSaleListing[]> {
    return this.instrumentPath.valueChanges().pipe(
      map((instruments) =>
        instruments.filter(
          (instrument) => instrument.brand.toLowerCase() === brand.toLowerCase()
        )
      ),
      catchError(() => of([]))
    );
  }

  // UPDATE
  updateInstrument(instrument: Partial<Instrument>): Observable<void> {
    return from(this.instrumentPath.doc(instrument.id).update(instrument)).pipe(
      catchError(() => of(null))
    );
  }

  // DELETE
  deleteInstrument(id: string): Observable<void> {
    return from(this.instrumentPath.doc(id).delete()).pipe(
      catchError(() => of(null))
    );
  }

  deactivateInstrument(id: string): Observable<void> {
    return from(this.instrumentPath.doc(id).set({ isActive: false })).pipe(
      catchError(() => of(null))
    );
  }
}
