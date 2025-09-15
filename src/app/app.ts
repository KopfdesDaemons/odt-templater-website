import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Sidemenu } from './components/sidemenu/sidemenu';
import { NgClass } from '@angular/common';
import { SidemenuToggle } from './services/sidemenu-toggle';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidemenu, NgClass, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('odt-templater-website');

  sidemenuS = inject(SidemenuToggle);
}
