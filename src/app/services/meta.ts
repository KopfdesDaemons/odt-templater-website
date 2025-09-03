import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BASE_URL } from '../environment/enviroment';
import { DocMeta } from '../models/doc-meta';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private router = inject(Router);
  private meta = inject(Meta);
  private title = inject(Title);

  constructor() {
    // subscribe to router navigation events
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.removeMetaData();
      });
  }

  private removeMetaData(): void {
    // remove all meta tags
    this.meta.removeTag('name="keywords"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:robots"');
    this.meta.removeTag('property="og:url"');
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:type"');
    this.meta.removeTag('property="article:published_time"');
    this.meta.removeTag('name="description"');
  }

  updateMetaTags(postMeta: DocMeta): void {
    const tagsToAdd: { property?: string; name?: string; content: string }[] = [
      { property: 'og:title', content: postMeta.title ?? 'odt-templater' },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: BASE_URL + this.router.url },
    ];

    if (postMeta.date) {
      tagsToAdd.push({
        property: 'article:published_time',
        content: postMeta.date.toISOString(),
      });
    }

    if (postMeta.description) {
      tagsToAdd.push({
        property: 'og:description',
        content: postMeta.description,
      });
      tagsToAdd.push({ name: 'description', content: postMeta.description });
    }

    if (postMeta.keywords) {
      tagsToAdd.push({
        name: 'keywords',
        content: postMeta.keywords.join(', '),
      });
    }

    this.meta.addTags(tagsToAdd);
    this.title.setTitle(postMeta.title ?? 'Ricos Website');
  }
}
