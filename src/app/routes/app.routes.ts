import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'legal-notice',
    loadComponent: () =>
      import('./legal-notice/legal-notice').then((m) => m.LegalNotice),
  },
  {
    path: 'legal-notice/.',
    loadComponent: () =>
      import('./legal-notice/legal-notice').then((m) => m.LegalNotice),
  },
  {
    path: 'doc/:fileName',
    loadComponent: () => import('./doc/doc').then((m) => m.Documentation),
  },
  {
    path: 'doc/:fileName/.',
    loadComponent: () => import('./doc/doc').then((m) => m.Documentation),
  },
];
