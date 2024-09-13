import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './infra/interceptors/auth.interceptor';
import { progressBarInterceptor } from './infra/interceptors/progress-bar.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authInterceptor, progressBarInterceptor])
    ),
    provideMomentDateAdapter({
        parse: {
          dateInput: ['DD MM YYYY'],
        },
        display: {
          dateInput: 'DD MM YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'DD MM YYYY',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      }, 
      {useUtc: true}
    )
  ]
};
