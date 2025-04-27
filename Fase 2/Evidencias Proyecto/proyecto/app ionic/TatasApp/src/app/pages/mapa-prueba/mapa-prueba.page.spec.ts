import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaPruebaPage } from './mapa-prueba.page';

describe('MapaPruebaPage', () => {
  let component: MapaPruebaPage;
  let fixture: ComponentFixture<MapaPruebaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaPruebaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
