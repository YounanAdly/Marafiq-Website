import { isPlatformBrowser } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "./layouts/footer/footer.component";
import { HeaderComponent } from "./layouts/header/header.component";
import { LanguageService } from './shared/services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'new-iacad0101-ui';
  public languageService = inject(LanguageService);

  ngOnInit(): void {
    if (isPlatformBrowser(this.languageService.platformId)) {
      this.languageService.waitLanguageLoad();
      this.languageService.RouteListener();
    }
  }

}
