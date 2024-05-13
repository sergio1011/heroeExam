import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/listHero/listHero.component'),
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/form/form.component')
  },
  {
    path: 'update/:id',
    loadComponent: () => import('./pages/form/form.component')
  },
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
