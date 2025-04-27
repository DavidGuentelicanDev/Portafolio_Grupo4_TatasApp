import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPruebaPage } from './dashboard-prueba.page';

describe('DashboardPruebaPage', () => {
  let component: DashboardPruebaPage;
  let fixture: ComponentFixture<DashboardPruebaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPruebaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
