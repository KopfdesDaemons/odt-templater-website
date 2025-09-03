import { Location } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

const __stripTrailingSlash = Location.stripTrailingSlash;

// Ermöglicht Navigation mit Trailing Slash ohne dass dieser entfernt wird
Location.stripTrailingSlash = function _stripTrailingSlash(
  url: string
): string {
  const urlParts = url.match(/([^?#]*)(\?[^#]*)?(#.*)?/);

  const path = urlParts?.[1] || '';
  const query = urlParts?.[2] || '';
  const fragment = urlParts?.[3] || '';

  // Wenn der Pfad mit einem Schrägstrich endet, füge einen Punkt hinzu
  return /[^\\/]\/$/.test(path)
    ? path + '.' + query + fragment
    : __stripTrailingSlash(url);
};
