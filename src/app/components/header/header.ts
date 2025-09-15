import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidemenuToggle } from '../../services/sidemenu-toggle';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  sidemenuS = inject(SidemenuToggle);

  click() {
    if (this.sidemenuS.menuIsOpen()) this.sidemenuS.toggleMenu();
  }
}
