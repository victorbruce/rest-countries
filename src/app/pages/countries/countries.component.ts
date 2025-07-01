import { Component, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { countryFeature } from '../../store/reducers/country.reducers';
import * as CountryActions from '../../store/actions/country.actions';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-countries',
  imports: [CommonModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
})
export class CountriesComponent {
  private readonly store = inject(Store);

  countries = this.store.selectSignal(countryFeature.selectCountries);
  loading = this.store.selectSignal(countryFeature.selectLoading);
  error = this.store.selectSignal(countryFeature.selectError);

  constructor() {
    this.store.dispatch(CountryActions.loadCountries());
  }
}
