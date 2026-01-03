import { TestBed } from '@angular/core/testing';

import { LostfoundlistService } from './lostfoundlist.service';

describe('LostfoundlistService', () => {
  let service: LostfoundlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LostfoundlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
