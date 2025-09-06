import { Component, inject, signal } from '@angular/core';
import { Documentation } from '../../components/documentation/documentation';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-doc',
  imports: [Documentation],
  templateUrl: './doc.html',
  styleUrl: './doc.scss',
})
export class DocRoute {
  shouldHydrate = signal(false);
  router = inject(Router);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.shouldHydrate.set(true);
      });
  }
}
