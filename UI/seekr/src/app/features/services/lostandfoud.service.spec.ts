import { TestBed } from '@angular/core/testing';

import { LostandfoudService } from './lostandfoud.service';

describe('LostandfoudService', () => {
  let service: LostandfoudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LostandfoudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
