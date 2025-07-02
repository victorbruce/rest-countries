import { Country } from '../../models/country';

export interface CountryState {
  countries: Country[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  regionFilter: string | null;
}

export const initialCountryState: CountryState = {
  countries: [],
  loading: false,
  error: null,
  searchTerm: '',
  regionFilter: null,
};
