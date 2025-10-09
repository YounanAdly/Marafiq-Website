import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ThemeService } from './shared/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { LanguageService } from './shared/services/language.service';
import { HeaderComponent } from "./layouts/header/header.component";
import { FooterComponent } from "./layouts/footer/footer.component";
import { filter } from 'rxjs';
import { CommonService } from './shared/services/common.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'new-iacad0101-ui';
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  public languageService = inject(LanguageService);
  private commonService = inject(CommonService);
  defaultLang = 'ar';

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.languageService.waitLanguageLoad();
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          const lang = this.router.routerState.snapshot.root.firstChild?.params['lang'];
          if (lang && this.isSupportedLang(lang)) {
            this.languageService.changeLanguage(lang);
          } else {
            if (this.commonService.getCookie('lang')) {
              this.languageService.changeLanguage(this.commonService.getCookie('lang'));
            } else {
              this.router.navigate([this.defaultLang]);
            }
          }
        });
    }
  }

  private isSupportedLang(lang: string): boolean {
    return ['en', 'ar'].includes(lang); // list your supported langs
  }

}
