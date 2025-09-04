import { RenderMode, ServerRoute } from '@angular/ssr';
import { getAllDocsTitles } from './server/services/docs.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'doc/:fileName',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getAllDocsTitles,
  },
  {
    path: 'doc/:fileName/.',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getAllDocsTitles,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
