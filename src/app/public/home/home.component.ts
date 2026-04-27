import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { LanguageService } from '../../shared/services/language.service';
import { SeoService } from '../../shared/services/seo.service';
import { ServiceOfferingCardComponent } from '../../shared/components/service-offering-card/service-offering-card.component';
import { MediaCenterSectionComponent } from '../../shared/components/media-center-section/media-center-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, ServiceOfferingCardComponent, MediaCenterSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  public currentLang = 'en';
  public languageService = inject(LanguageService);
  private seo = inject(SeoService);
  private translate = inject(TranslateService);
  private router = inject(Router);

  // ── Services carousel state ──────────────────────────────────────────────
  atStart = true;
  atEnd = false;
  private readonly CARD_SCROLL = 288; // 268px card + 20px gap

  @ViewChild('servicesTrack') private servicesTrackRef!: ElementRef<HTMLElement>;

  readonly serviceItems = [
    {
      titleKey: 'home.services.cards.connection.title',
      descriptionKey: 'home.services.cards.connection.description',
      imageSrc: 'assets/images/bgImage.svg',
      imageAltKey: 'home.services.cards.connection.imageAlt',
    },
    {
      titleKey: 'home.services.cards.tanker.title',
      descriptionKey: 'home.services.cards.tanker.description',
      imageSrc: 'assets/images/bgImage.svg',
      imageAltKey: 'home.services.cards.tanker.imageAlt',
    },
    {
      titleKey: 'home.services.cards.meter.title',
      descriptionKey: 'home.services.cards.meter.description',
      imageSrc: 'assets/images/bgImage.svg',
      imageAltKey: 'home.services.cards.meter.imageAlt',
    },
    {
      titleKey: 'home.services.cards.disconnection.title',
      descriptionKey: 'home.services.cards.disconnection.description',
      imageSrc: 'assets/images/bgImage.svg',
      imageAltKey: 'home.services.cards.disconnection.imageAlt',
    },
     {
      titleKey: 'home.services.cards.tanker.title',
      descriptionKey: 'home.services.cards.tanker.description',
      imageSrc: 'assets/images/bgImage.svg',
      imageAltKey: 'home.services.cards.tanker.imageAlt',
    }, {
      titleKey: 'home.services.cards.tanker.title',
      descriptionKey: 'home.services.cards.tanker.description',
      imageSrc: 'assets/images/bgImage.svg',
      imageAltKey: 'home.services.cards.tanker.imageAlt',
    }, {
      titleKey: 'home.services.cards.tanker.title',
      descriptionKey: 'home.services.cards.tanker.description',
      imageSrc: 'assets/images/bgImage.svg',
      imageAltKey: 'home.services.cards.tanker.imageAlt',
    },
  ];

  readonly complaintItems = [
    {
      titleKey: 'home.complaints.cards.waterLeakage.title',
      descriptionKey: 'home.complaints.cards.waterLeakage.description',
      imageSrc: 'assets/images/complaint-water-leakage.png',
      imageAltKey: 'home.complaints.cards.waterLeakage.imageAlt',
      surfaceClass: 'complaint-card-warm',
    },
    {
      titleKey: 'home.complaints.cards.waterQuality.title',
      descriptionKey: 'home.complaints.cards.waterQuality.description',
      imageSrc: 'assets/images/complaint-water-quality.png',
      imageAltKey: 'home.complaints.cards.waterQuality.imageAlt',
      surfaceClass: 'complaint-card-cool',
    },
    {
      titleKey: 'home.complaints.cards.meterIssues.title',
      descriptionKey: 'home.complaints.cards.meterIssues.description',
      imageSrc: 'assets/images/complaint-meter-issues.png',
      imageAltKey: 'home.complaints.cards.meterIssues.imageAlt',
      surfaceClass: 'complaint-card-muted',
    },
    {
      titleKey: 'home.complaints.cards.general.title',
      descriptionKey: 'home.complaints.cards.general.description',
      imageSrc: 'assets/images/complaint-general.png',
      imageAltKey: 'home.complaints.cards.general.imageAlt',
      surfaceClass: 'complaint-card-sky',
    },
  ];

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage() || 'en';
    this.setSeo();
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      this.setSeo();
    });
  }

  ngAfterViewInit(): void {
    const track = this.servicesTrackRef?.nativeElement;
    if (track) {
      this.updateScrollState(track);
    }
  }

  // ── Carousel helpers ─────────────────────────────────────────────────────
  scrollServicesPrev(): void {
    const track = this.servicesTrackRef?.nativeElement;
    if (!track) return;
    track.scrollBy({ left: -this.CARD_SCROLL, behavior: 'smooth' });
  }

  scrollServicesNext(): void {
    const track = this.servicesTrackRef?.nativeElement;
    if (!track) return;
    track.scrollBy({ left: this.CARD_SCROLL, behavior: 'smooth' });
  }

  onServicesScroll(track: HTMLElement): void {
    this.updateScrollState(track);
  }

  private updateScrollState(track: HTMLElement): void {
    this.atStart = track.scrollLeft <= 1;
    this.atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  }

  toggleLanguage(): void {
    const lang = this.currentLang === 'en' ? 'ar' : 'en';
    this.languageService.changeLanguage(lang);
    this.currentLang = lang;
  }

  onViewMoreServices(): void {
    void this.router.navigate(['/', this.currentLang, 'contact-us']);
  }

  onServiceApply(): void {
    void this.router.navigate(['/', this.currentLang, 'create-account']);
  }

  onSendInquiry(): void {
    void this.router.navigate(['/', this.currentLang, 'contact-us']);
  }

  onSubmitComplaint(): void {
    void this.router.navigate(['/', this.currentLang, 'contact-us']);
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