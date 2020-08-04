import { TestBed } from '@angular/core/testing';

import { PermStopService } from './perm-stop.service';

describe('PermStopService', () => {
  let service: PermStopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermStopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
