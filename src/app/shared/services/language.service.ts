import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { CommonService } from './common.service';
import { AppConfig } from '../../config/app.config';

const DIRECTION_MAP: Record<string, 'ltr' | 'rtl'> = {
    en: 'ltr',
    ar: 'rtl'
    // Add other languages as needed
};

@Injectable({
    providedIn: 'root'  // singleton service available app-wide
})
export class LanguageService {
    public platformId = inject(PLATFORM_ID)
    private router = inject(Router);
    private commonService = inject(CommonService);
    private translateService = inject(TranslateService);
    defaultLang: string = AppConfig.defaultLanguage || 'en';

    isReady = signal(false);

    /**
     * Change the current language: switches TranslateService, persists cookie, and updates HTML dir/lang.
     * @param lang Target language code
     */
    changeLanguage(lang: string): void {
        if (this.isSupportedLang(lang)) {
            this.translateService.use(lang);
            // Optional: save preference in cookie or localStorage
            document.cookie = `lang=${lang}; path=/; SameSite=Lax;`;

            // Set direction
            const dir = DIRECTION_MAP[lang] || 'ltr';
            document.documentElement.setAttribute('dir', dir);
            document.documentElement.setAttribute('lang', lang);
            this.ChangeLanguageInUrl(lang);
        }
    }

    /**
     * Updates the first URL segment to reflect the new language and navigates.
     * @param newLang Target language code
     */
    ChangeLanguageInUrl(newLang: string) {
        // Get current URL segments
        const urlSegments = this.router.url.split('/').filter((segment: string) => segment.length > 0);

        if (urlSegments.length > 0) {
            // Replace the first segment (lang code) with newLang
            urlSegments[0] = newLang;

            this.router.navigate(['/', ...urlSegments], {
                queryParamsHandling: 'preserve', // preserve query params if any
                // optional:
                // replaceUrl: true // replace history instead of adding a new entry
            });

        } else {
            // If no lang in URL, just navigate to /newLang
            this.router.navigate(['/', newLang]);
        }
    }


    /**
     * Get the current language from TranslateService or fallback to default.
     */
    getCurrentLanguage(): string {
        return this.translateService.getCurrentLang() || AppConfig.defaultLanguage || 'en';
    }

    /**
     * Initialize the language from cookie or provided default and set document attributes.
     * @param defaultLang Fallback language when cookie is absent
     */
    initLanguage(defaultLang = 'en'): void {
        if (isPlatformBrowser(this.platformId)) {
            const match = document.cookie.match(/lang=(\w+)/);
            const lang = match ? match[1] : defaultLang;
            this.translateService.use(lang);
            this.translateService.use(lang);
            // Set direction
            const dir = DIRECTION_MAP[lang] || 'ltr';
            document.documentElement.setAttribute('dir', dir);
            document.documentElement.setAttribute('lang', lang);
            this.RouteListener();
        }
    }

    /**
     * Ensures translations are loaded before marking the service ready.
     */
    waitLanguageLoad() {
        var match = document.cookie.match(/(?:^|;\s*)lang=(\w+)/);
        var lang = match ? match[1] : 'en';
        this.translateService.use(lang);

        this.translateService.use(lang).subscribe(() => {
            this.isReady.set(true);
            this.initLanguage();
        });
    }

    /**
     * Watches route changes to synchronize URL language segment with app language.
     */
    RouteListener() {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                const lang = this.router.routerState.snapshot.root.firstChild?.params['lang'];
                if (lang && this.isSupportedLang(lang)) {
                    this.changeLanguage(lang);
                }
                else {
                    if (this.commonService.getCookie('lang') && this.isSupportedLang(lang)) {
                        this.changeLanguage(this.commonService.getCookie('lang'));
                    } else {
                        this.router.navigate([this.defaultLang]);
                    }
                }
            });
    }

    /**
     * Checks if provided language is supported.
     */
    private isSupportedLang(lang: string): boolean {
        return AppConfig.supportedLanguages.includes(lang); // list your supported langs
    }
}
