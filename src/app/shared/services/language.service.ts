import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { CommonService } from './common.service';

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
    defaultLang: string = 'ar';

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
        return this.translateService.currentLang || this.translateService.defaultLang || 'en';
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
            this.RouteListener();
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

    RouteListener() {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                const lang = this.router.routerState.snapshot.root.firstChild?.params['lang'];
                if (lang && this.isSupportedLang(lang)) {
                    this.changeLanguage(lang);
                }
                else {
                    if (this.commonService.getCookie('lang')) {
                        this.changeLanguage(this.commonService.getCookie('lang'));
                    } else {
                        this.router.navigate([this.defaultLang]);
                    }
                }
            });
    }

    private isSupportedLang(lang: string): boolean {
        return ['en', 'ar'].includes(lang); // list your supported langs
    }
}
