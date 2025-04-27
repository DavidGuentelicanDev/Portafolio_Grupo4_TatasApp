import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObtenerContactosPage } from './obtener-contactos.page';

describe('ObtenerContactosPage', () => {
  let component: ObtenerContactosPage;
  let fixture: ComponentFixture<ObtenerContactosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtenerContactosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
