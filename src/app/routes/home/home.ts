import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  faCopy = faCopy;

  copyInstallCommand() {
    navigator.clipboard.writeText('npm i odt-templater');
  }
}
