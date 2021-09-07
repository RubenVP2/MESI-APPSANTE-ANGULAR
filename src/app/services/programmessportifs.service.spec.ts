import { TestBed } from '@angular/core/testing';

import { ProgrammessportifsService } from './programmessportifs.service';

describe('ProgrammessportifsService', () => {
  let service: ProgrammessportifsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrammessportifsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
