import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  countryFeatureKey,
  countryReducer,
} from './store/reducers/country.reducers';
import { CountryEffects } from './store/effects/country.effects';
import { themeReducer } from './store/reducers/theme.reducers';
import { ThemeEffects } from './store/effects/theme.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      [countryFeatureKey]: countryReducer,
      theme: themeReducer,
    }),
    provideEffects([CountryEffects, ThemeEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
