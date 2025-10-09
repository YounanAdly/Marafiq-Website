import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const DIRECTION_MAP: Record<string, 'ltr' | 'rtl'> = {
    en: 'ltr',
    ar: 'rtl'
    // Add other languages as needed
};

@Injectable({
    providedIn: 'root'  // singleton service available app-wide
})
export class LanguageService {
    private platformId = inject(PLATFORM_ID)
    private router = inject(Router);
    private translateService = inject(TranslateService);
    isReady = signal(false);

    /** Change the current language */
    changeLanguage(lang: string): void {
        this.translateService.use(lang);
        // Optional: save preference in cookie or localStorage
        document.cookie = `lang=${lang}; path=/; SameSite=Lax;`;

        // Set direction
        const dir = DIRECTION_MAP[lang] || 'ltr';
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', lang);
        this.ChangeLanguageInUrl(lang);
    }

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


    /** Get the current language */
    getCurrentLanguage(): string {
        return this.translateService.currentLang || this.translateService.defaultLang || 'ar';
    }

    /** Initialize default language and optionally load from cookie */
    initLanguage(defaultLang = 'en'): void {
        if (isPlatformBrowser(this.platformId)) {
            const match = document.cookie.match(/lang=(\w+)/);
            const lang = match ? match[1] : defaultLang;
            this.translateService.setDefaultLang(lang);
            this.translateService.use(lang);
            // Set direction
            const dir = DIRECTION_MAP[lang] || 'ltr';
            document.documentElement.setAttribute('dir', dir);
            document.documentElement.setAttribute('lang', lang);
        }
    }

    waitLanguageLoad() {
        var match = document.cookie.match(/(?:^|;\s*)lang=(\w+)/);
        var lang = match ? match[1] : 'en';
        this.translateService.setDefaultLang(lang);

        this.translateService.use(lang).subscribe(() => {
            this.isReady.set(true);
            this.initLanguage();
        });
    }
}
