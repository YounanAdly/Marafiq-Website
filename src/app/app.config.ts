import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FORMLY_CONFIG } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import material from '@primeng/themes/material';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { FormlyConfigModule } from './shared/formly/formly-config.module';
import { formlyTranslateExtension } from './shared/formly/formly.validation';
import { provideTranslations } from './translate.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(FormlyConfigModule),
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


