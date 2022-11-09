import { TestBed } from '@angular/core/testing';

import { MDaiService } from './m-dai.service';

describe('MDaiService', () => {
  let service: MDaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MDaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
