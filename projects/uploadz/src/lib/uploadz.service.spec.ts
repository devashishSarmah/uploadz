import { TestBed } from '@angular/core/testing';

import { UploadzService } from './uploadz.service';

describe('UploadzService', () => {
  let service: UploadzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
