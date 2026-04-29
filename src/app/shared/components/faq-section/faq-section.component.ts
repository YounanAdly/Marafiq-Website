import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

interface FaqItem {
  questionKey: string;
  answerKey?: string;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.scss',
})
export class FaqSectionComponent {
  private readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);

  readonly faqs: FaqItem[] = [
    {
      questionKey: 'home.faq.items.applyConnection.question',
      answerKey: 'home.faq.items.applyConnection.answer',
    },
    {
      questionKey: 'home.faq.items.requestDuration.question',
      answerKey: 'home.faq.items.requestDuration.answer',
    },
    {
      questionKey: 'home.faq.items.submitComplaint.question',
      answerKey: 'home.faq.items.submitComplaint.answer',
    },
    {
      questionKey: 'home.faq.items.serviceDisruption.question',
      answerKey: 'home.faq.items.serviceDisruption.answer',
    },
  ];

  activeFaqIndex = 0;

  onViewMore(): void {
    const currentLang = this.languageService.getCurrentLanguage() || 'en';
    void this.router.navigate(['/', currentLang, 'contact-us']);
  }

  onToggle(index: number): void {
    this.activeFaqIndex = this.activeFaqIndex === index ? -1 : index;
  }
}
