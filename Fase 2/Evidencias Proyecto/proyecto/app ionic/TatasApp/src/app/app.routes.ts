import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard-prueba',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registrar',
    loadComponent: () => import('./pages/registrar/registrar.page').then( m => m.RegistrarPage)
  },
  {
    path: 'principal',
    loadComponent: () => import('./pages/principal/principal.page').then( m => m.PrincipalPage)
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'dashboard-prueba',
    loadComponent: () => import('./pages/dashboard-prueba/dashboard-prueba.page').then( m => m.DashboardPruebaPage)
  },
  {
    path: 'mapa-prueba',
    loadComponent: () => import('./pages/mapa-prueba/mapa-prueba.page').then( m => m.MapaPruebaPage)
  },
  {
    path: 'obtener-contactos',
    loadComponent: () => import('./pages/obtener-contactos/obtener-contactos.page').then( m => m.ObtenerContactosPage)
  },
  {
    path: 'registrar',
    loadComponent: () => import('./pages/registrar/registrar.page').then( m => m.RegistrarPage)
  },

];
