import { TestBed } from '@angular/core/testing';

import { ApiPruebaService } from './api-prueba.service';

describe('ApiPruebaService', () => {
  let service: ApiPruebaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPruebaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
