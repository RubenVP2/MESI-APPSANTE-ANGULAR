import { TestBed } from '@angular/core/testing';

import { WellBeingService } from './well-being.service';

describe('WellBeingService', () => {
  let service: WellBeingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WellBeingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
