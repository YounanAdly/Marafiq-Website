import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../shared/services/language.service';

interface FooterNavLink {
  labelKey: string;
  route: string;
}

interface FooterContactInfo {
  icon: 'phone' | 'email' | 'address';
  textKey: string;
  href: string;
}

interface FooterSocialLink {
  platform: 'facebook' | 'x' | 'linkedin';
  href: string;
  ariaLabelKey: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private readonly languageService = inject(LanguageService);

  @Input() logoSrc = 'assets/images/logoNav.svg';
  @Input() menuLinks: FooterNavLink[] = [
    { labelKey: 'footer.menu.aboutUs', route: 'home' },
    { labelKey: 'footer.menu.services', route: 'home' },
    { labelKey: 'footer.menu.complaints', route: 'contact-us' },
    { labelKey: 'footer.menu.mediaCenter', route: 'home' },
    { labelKey: 'footer.menu.faq', route: 'contact-us' },
  ];
  @Input() contactInfo: FooterContactInfo[] = [
    { icon: 'phone', textKey: 'footer.contact.phone', href: 'tel:+96822143933' },
    { icon: 'email', textKey: 'footer.contact.email', href: 'mailto:records@marafiq.om' },
    { icon: 'address', textKey: 'footer.contact.address', href: '#' },
  ];
  @Input() socialLinks: FooterSocialLink[] = [
    { platform: 'facebook', href: '#', ariaLabelKey: 'footer.social.facebook' },
    { platform: 'x', href: '#', ariaLabelKey: 'footer.social.x' },
    { platform: 'linkedin', href: '#', ariaLabelKey: 'footer.social.linkedin' },
  ];
  @Input() legalLinks: FooterNavLink[] = [
    { labelKey: 'footer.legal.privacy', route: 'contact-us' },
    { labelKey: 'footer.legal.terms', route: 'contact-us' },
    { labelKey: 'footer.legal.accessibility', route: 'contact-us' },
  ];

  readonly year = new Date().getFullYear();

  getLocalizedRoute(route: string): string[] {
    return ['/', this.languageService.getCurrentLanguage(), route];
  }
}
