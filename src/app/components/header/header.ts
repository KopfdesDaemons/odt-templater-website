import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { SidemenuToggle } from '../../services/sidemenu-toggle';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FaIconComponent, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  sidemenuS = inject(SidemenuToggle);

  faBars = faBars;

  click() {
    if (this.sidemenuS.menuIsOpen()) this.sidemenuS.toggleMenu();
  }
}
