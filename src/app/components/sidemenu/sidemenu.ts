import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidemenuToggle } from '../../services/sidemenu-toggle';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidemenu',
  imports: [RouterLink, NgClass],
  templateUrl: './sidemenu.html',
  styleUrl: './sidemenu.scss',
})
export class Sidemenu {
  sidemenuS = inject(SidemenuToggle);

  toggleMenu() {
    if (this.sidemenuS.menuIsOpen()) this.sidemenuS.toggleMenu();
  }
}
