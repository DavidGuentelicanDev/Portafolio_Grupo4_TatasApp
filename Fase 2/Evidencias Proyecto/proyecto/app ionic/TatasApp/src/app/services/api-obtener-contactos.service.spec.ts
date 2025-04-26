import { TestBed } from '@angular/core/testing';

import { ApiObtenerContactosService } from './api-obtener-contactos.service';

describe('ApiObtenerContactosService', () => {
  let service: ApiObtenerContactosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiObtenerContactosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
