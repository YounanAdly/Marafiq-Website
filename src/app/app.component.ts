import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "./layouts/footer/footer.component";
import { HeaderComponent } from "./layouts/header/header.component";
import { LanguageService } from './shared/services/language.service';
import { GlobalLoaderComponent } from './shared/components/loader.type';

@Component({
  selector: 'app-root',
  imports: [RouterModule, HeaderComponent, FooterComponent, GlobalLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'custom-template';
  public languageService = inject(LanguageService);
  @ViewChild('mainContent') mainContent!: ElementRef;

  ngOnInit(): void {
    if (isPlatformBrowser(this.languageService.platformId)) {
      this.languageService.waitLanguageLoad();
      this.languageService.RouteListener();
    }
  }

  skipToContent(event: Event): void {
    event.preventDefault();
    const main = document.getElementById('main-content');
    if (main) {
      main.focus();
    }
  }

}
