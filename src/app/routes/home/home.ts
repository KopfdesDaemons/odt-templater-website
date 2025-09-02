import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  faCopy = faCopy;

  copyInstallCommand() {
    navigator.clipboard.writeText('npm i odt-templater');
  }
}
