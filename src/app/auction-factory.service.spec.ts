import { TestBed } from '@angular/core/testing';

import { AuctionFactoryService } from './auction-factory.service';

describe('AuctionFactoryService', () => {
  let service: AuctionFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
