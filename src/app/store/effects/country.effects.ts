import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CountryActions from '../actions/country.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Injectable()
export class CountryEffects {
  private actions$ = inject(Actions);
  private countryService = inject(CountryService);

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      mergeMap(() =>
        this.countryService.getCountries().pipe(
          map((countries) =>
            CountryActions.loadCountriesSuccess({ countries })
          ),
          catchError((error) =>
            of(CountryActions.loadCountriesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadCountryByCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountryByCode),
      mergeMap(({ code }) =>
        this.countryService.getCountryByCode(code).pipe(
          map((country) =>
            CountryActions.loadCountryByCodeSuccess({ country })
          ),
          catchError((error) =>
            of(CountryActions.loadCountryByCodeFailure({ error: error.message }))
          )
        )
      )
    )
  );

}
