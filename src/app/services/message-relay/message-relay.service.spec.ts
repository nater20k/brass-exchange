import { TestBed } from '@angular/core/testing';

import { MessageRelayService } from './message-relay.service';

describe('MessageRelayService', () => {
  let service: MessageRelayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageRelayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
