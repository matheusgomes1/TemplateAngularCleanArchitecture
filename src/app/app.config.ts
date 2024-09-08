import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(),
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
