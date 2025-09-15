import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidemenuToggle } from '../../services/sidemenu-toggle';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidemenu',
  imports: [RouterLink, NgClass],
  templateUrl: './sidemenu.html',
  styleUrl: './sidemenu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidemenu {
  sidemenuS = inject(SidemenuToggle);
  elementRef = inject(ElementRef);

  @HostListener('focusout', ['$event']) onFocusOut(event: FocusEvent) {
    if (!this.elementRef.nativeElement.contains(event.relatedTarget)) {
      this.toggleMenu();
    }
  }

  toggleMenu() {
    if (this.sidemenuS.menuIsOpen()) this.sidemenuS.toggleMenu();
  }
}
