import { TestBed } from '@angular/core/testing';

import { AuctionImplementationService } from './auction-implementation.service';

describe('AuctionImplementationService', () => {
  let service: AuctionImplementationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionImplementationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
