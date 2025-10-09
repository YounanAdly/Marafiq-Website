import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { FormlyConfigModule } from './shared/formly/formly-config.module';
import { provideTranslations } from './translate.config';
import { FORMLY_CONFIG } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { formlyTranslateExtension } from './shared/formly/formly.validation';
import { providePrimeNG } from 'primeng/config';
import material from '@primeng/themes/material';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(FormlyConfigModule),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: material,
      },
    }),
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: formlyTranslateExtension,
      deps: [TranslateService],
    },
    ...provideTranslations()
  ]
};


