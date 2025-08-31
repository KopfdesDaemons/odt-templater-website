import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidemenuToggle {
  public menuIsOpen = signal<boolean>(false);

  public toggleMenu() {
    this.menuIsOpen.set(!this.menuIsOpen());
    console.log('MenuIsOpen:', this.menuIsOpen());
  }
}
