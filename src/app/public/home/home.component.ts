import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { LanguageService } from '../../shared/services/language.service';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public currentLang = 'en';
  public languageService = inject(LanguageService);
  private seo = inject(SeoService);
  private translate = inject(TranslateService);

  ngOnInit() {
    this.currentLang = this.languageService.getCurrentLanguage() || 'en';
    this.setSeo();
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      this.setSeo();
    });
  }

  toggleLanguage() {
    const lang = this.currentLang === 'en' ? 'ar' : 'en';
    this.languageService.changeLanguage(lang);
    this.currentLang = lang;
  }

  private setSeo() {
    this.seo.update({
      title: this.translate.instant('home.seo.title'),
      description: this.translate.instant('home.seo.description'),
      keywords: this.translate.instant('home.seo.keywords'),
      url: this.translate.instant(environment.AppConfig.apiBaseUrl + 'home.seo.url'),
      author: this.translate.instant('home.seo.author'),
      type: 'website',
    });
  }
}