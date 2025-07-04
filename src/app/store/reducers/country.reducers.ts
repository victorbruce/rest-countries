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
    })),
    on(CountryActions.setRegionFilter, (state, { region }) => ({
      ...state,
      regionFilter: region,
    })),
    on(CountryActions.selectCountry, (state, { country }) => ({
      ...state,
      selectedCountry: country,
    })),
    on(CountryActions.loadCountryByCodeSuccess, (state, { country }) => ({
      ...state,
      selectedCountry: country,
      loading: false,
    })),
    on(CountryActions.loadCountryByCodeFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),
    on(CountryActions.loadCountryByCode, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
  ),
});

// auto-generated selectors
export const {
  name: countryFeatureKey,
  reducer: countryReducer,
  selectCountries,
  selectLoading,
  selectError,
  selectSearchTerm,
  selectRegionFilter,
} = countryFeature;

// custom selectors
export const selectFilteredCountries = createSelector(
  selectCountries,
  selectSearchTerm,
  selectRegionFilter,
  (countries, searchTerm, region) => {
    return countries.filter((c) => {
      const matchesSearch = c.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesRegion = region ? c.region === region : true;

      return matchesSearch && matchesRegion;
    });
  }
);

export const selectSelectedCountry = createSelector(
  countryFeature.selectSelectedCountry,
  (selectedCountry) => selectedCountry
);

export const selectBorderCountries = createSelector(
  selectCountries,
  selectSelectedCountry,
  (allCountries, selected) => {
    if (!selected || !selected.borders?.length) {
      return [];
    }
    return selected.borders
      .map(code => allCountries.find(c => c.cca3 === code))
      .filter(Boolean);
  }
);