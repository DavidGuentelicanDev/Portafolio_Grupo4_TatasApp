import { TestBed } from '@angular/core/testing';

import { ZonaSeguraService } from './zona-segura.service';

describe('ZonaSeguraService', () => {
  let service: ZonaSeguraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZonaSeguraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
