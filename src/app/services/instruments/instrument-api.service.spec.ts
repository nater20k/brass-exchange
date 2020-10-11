import { TestBed } from '@angular/core/testing';

import { InstrumentApiService } from './instrument-api.service';

describe('InstrumentApiService', () => {
  let service: InstrumentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstrumentApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
