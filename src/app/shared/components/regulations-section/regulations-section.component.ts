import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

interface RegulationCard {
  titleKey: string;
  categoryValueKey: string;
  publishedValueKey: string;
  surfaceClass: string;
}

@Component({
  selector: 'app-regulations-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './regulations-section.component.html',
  styleUrl: './regulations-section.component.scss',
})
export class RegulationsSectionComponent {
  private readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);

  readonly cards: RegulationCard[] = [
    {
      titleKey: 'home.regulations.cards.waterServicePolicy.title',
      categoryValueKey: 'home.regulations.cards.waterServicePolicy.category',
      publishedValueKey: 'home.regulations.cards.waterServicePolicy.published',
      surfaceClass: 'regulation-card-surface-1',
    },
    {
      titleKey: 'home.regulations.cards.customerCharter.title',
      categoryValueKey: 'home.regulations.cards.customerCharter.category',
      publishedValueKey: 'home.regulations.cards.customerCharter.published',
      surfaceClass: 'regulation-card-surface-2',
    },
    {
      titleKey: 'home.regulations.cards.meterInstallationGuidelines.title',
      categoryValueKey: 'home.regulations.cards.meterInstallationGuidelines.category',
      publishedValueKey: 'home.regulations.cards.meterInstallationGuidelines.published',
      surfaceClass: 'regulation-card-surface-3',
    },
  ];

  onViewMore(): void {
    const currentLang = this.languageService.getCurrentLanguage() || 'en';
    void this.router.navigate(['/', currentLang, 'contact-us']);
  }

  onViewDetails(): void {
    const currentLang = this.languageService.getCurrentLanguage() || 'en';
    void this.router.navigate(['/', currentLang, 'contact-us']);
  }

  onDownloadPdf(): void {
    const currentLang = this.languageService.getCurrentLanguage() || 'en';
    void this.router.navigate(['/', currentLang, 'contact-us']);
  }
}
