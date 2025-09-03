import { RenderMode, ServerRoute } from '@angular/ssr';
import { getAllDocsTitles } from './server/services/docs.service';

// const docs

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
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
];
