import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  copyButtonClicked = signal(false);
  private meta = inject(Meta);
  private title = inject(Title);

  ngOnInit(): void {
    this.setMetaTags();
  }

  copyInstallCommand() {
    navigator.clipboard.writeText('npm i odt-templater');
  }

  copyButtonClick() {
    this.copyInstallCommand();
    this.copyButtonClicked.set(true);
    setTimeout(() => {
      this.copyButtonClicked.set(false);
    }, 2000);
  }

  setMetaTags() {
    this.title.setTitle('odt-templater');
    const description =
      'A simple templating engine for OpenDocument Text (.odt) files that can be used in Node.js and in the browser.';
    this.meta.addTags([
      { property: 'og:description', content: description },
      { name: 'description', content: description },
    ]);
  }
}
