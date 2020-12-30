import { TestBed } from '@angular/core/testing';

import { PwaTestingService } from './pwa-testing.service';

describe('PwaTestingService', () => {
  let service: PwaTestingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PwaTestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
