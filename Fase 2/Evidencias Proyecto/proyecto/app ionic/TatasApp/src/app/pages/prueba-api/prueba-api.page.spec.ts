import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PruebaApiPage } from './prueba-api.page';

describe('PruebaApiPage', () => {
  let component: PruebaApiPage;
  let fixture: ComponentFixture<PruebaApiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
