import { TestBed } from '@angular/core/testing';

import { LegaService } from './lega.service';

describe('LegaService', () => {
  let service: LegaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
