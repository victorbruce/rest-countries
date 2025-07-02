import { createAction, props } from '@ngrx/store';
import { Country } from '../../models/country';

export const loadCountries = createAction('[Country] Load Countries');

export const loadCountriesSuccess = createAction(
  '[Country] Load Countries Success',
  props<{ countries: Country[] }>()
);

export const loadCountriesFailure = createAction(
  '[Country] Load Countries Failure',
  props<{ error: string }>()
);

export const setSearchTerm = createAction(
  '[Country] Set Search Term',
  props<{ searchTerm: string }>()
);

export const loadACountry = createAction('[Country] Load A Country');
