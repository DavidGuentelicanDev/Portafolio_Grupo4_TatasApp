import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'registrar',
    pathMatch: 'full',
  },
  {
    path: 'prueba-api',
    loadComponent: () => import('./pages/prueba-api/prueba-api.page').then( m => m.PruebaApiPage)
  },
  {
    path: 'registrar',
    loadComponent: () => import('./pages/registrar/registrar.page').then( m => m.RegistrarPage)
  },



];
