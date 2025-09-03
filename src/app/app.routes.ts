import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/home/home').then((m) => m.Home),
  },
  {
    path: 'doc/:fileName',
    loadComponent: () => import('./routes/doc/doc').then((m) => m.DocRoute),
  },
  {
    path: 'doc/:fileName/.',
    loadComponent: () => import('./routes/doc/doc').then((m) => m.DocRoute),
  },
];
