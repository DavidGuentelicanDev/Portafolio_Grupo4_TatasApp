import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'prueba-api',
    pathMatch: 'full',
  },
  {
    path: 'prueba-api',
    loadComponent: () => import('./pages/prueba-api/prueba-api.page').then( m => m.PruebaApiPage)
  },
];
