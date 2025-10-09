import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FontSizeService } from '../../shared/services/font-size.service';
import { LanguageService } from '../../shared/services/language.service';
import { ThemeService } from '../../shared/services/theme.service';
import formConfig from './form.json'
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-home-page',
  imports: [ReactiveFormsModule, FormlyModule, TranslateModule, FormsModule, InputMaskModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  currentLang = '';
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);
  public fontService = inject(FontSizeService)
  translate = inject(TranslateService);

  form!: FormGroup;
  model = { name: '' };

  fields: FormlyFieldConfig[] = [];
  value: string = '99-999999';

  ngOnInit() {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.loadForm();
    this.translate.onLangChange.subscribe(lang => {
      this.loadForm();
    })
  }

  loadForm() {
    this.form = new FormGroup({});
    this.fields = formConfig;
  }

  // This method toggles the theme between light and dark
  toggleTheme() {
    const current = this.themeService.getTheme();
    this.themeService.setTheme(current === 'dark' ? 'light' : 'dark');
  }

  toggleLanguage() {
    const newLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.languageService.changeLanguage(newLang);
    this.currentLang = newLang;
  }

  submit() {
    console.log(this.model);
  }
}
