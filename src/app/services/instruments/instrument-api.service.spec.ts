import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { InstrumentApiService } from './instrument-api.service';

describe('InstrumentApiService', () => {
  let service: InstrumentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
    });
    service = TestBed.inject(InstrumentApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
