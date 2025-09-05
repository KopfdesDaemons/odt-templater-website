import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  copyButtonClicked = signal(false);

  copyInstallCommand() {
    navigator.clipboard.writeText('npm i odt-templater');
  }

  copyButtonClick() {
    this.copyButtonClicked.set(true);
    setTimeout(() => {
      this.copyButtonClicked.set(false);
    }, 2000);
  }
}
