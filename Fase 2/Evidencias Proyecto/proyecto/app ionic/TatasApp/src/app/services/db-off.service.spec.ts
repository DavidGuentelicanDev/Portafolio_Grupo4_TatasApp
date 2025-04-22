import { TestBed } from '@angular/core/testing';

import { DbOffService } from './db-off.service';

describe('DbOffService', () => {
  let service: DbOffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbOffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
