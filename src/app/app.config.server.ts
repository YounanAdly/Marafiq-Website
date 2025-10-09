import { provideServerRendering } from '@angular/ssr';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
import { provideTranslations } from './translate.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(),
    ...provideTranslations()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
