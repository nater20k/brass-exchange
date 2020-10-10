import { TestBed } from '@angular/core/testing';

import { UserAdapterService } from './user-adapter.service';

describe('UserAdapterService', () => {
  let service: UserAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
