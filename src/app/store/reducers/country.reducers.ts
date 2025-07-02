import { createReducer, createFeature, on, createSelector } from '@ngrx/store';
import * as CountryActions from '../actions/country.actions';
import { initialCountryState } from '../state/country.state';

export const countryFeature = createFeature({
  name: 'countries',
  reducer: createReducer(
    initialCountryState,
    on(CountryActions.loadCountries, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(CountryActions.loadCountriesSuccess, (state, { countries }) => ({
      ...state,
      countries,
      loading: false,
    })),
    on(CountryActions.loadCountriesFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),
    on(CountryActions.setSearchTerm, (state, { searchTerm }) => ({
      ...state,
      searchTerm,
    }))
  ),
});

export const {
  name: countryFeatureKey,
  reducer: countryReducer,
  selectCountries,
  selectLoading,
  selectError,
  selectSearchTerm,
} = countryFeature;

export const selectFilteredCountries = createSelector(
  selectCountries,
  selectSearchTerm,
  (countries, searchTerm) => {
    return countries.filter((c) => {
      const matchesSearch = c.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }
);
