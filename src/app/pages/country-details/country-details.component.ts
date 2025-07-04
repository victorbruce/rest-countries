import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Country, CountryName } from '../../models/country';

import {
  countryFeature,
  selectSelectedCountry,
  selectBorderCountries,
} from '../../store/reducers/country.reducers';
import * as CountryActions from '../../store/actions/country.actions';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-country-details',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
})
export class CountryDetailsComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  country = this.store.selectSignal(selectSelectedCountry);
  loading = this.store.selectSignal(countryFeature.selectLoading);
  error = this.store.selectSignal(countryFeature.selectError);
  borderCountries = this.store.selectSignal(selectBorderCountries);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const code = params.get('code');
      if (code) {
        this.store.dispatch(CountryActions.loadCountryByCode({ code }));
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  getFirstNativeName(nativeNameObj?: CountryName['nativeName']): string {
    if (!nativeNameObj) return '';
    const firstLang = Object.keys(nativeNameObj)[0];
    return nativeNameObj[firstLang]?.common || '';
  }

  getCurrencies(currencies?: Country['currencies']): string {
    if (!currencies) return '';
    return Object.values(currencies)
      .map((c) => c.name)
      .join(', ');
  }

  getLanguages(languages?: Country['languages']): string {
    if (!languages) return '';
    return Object.values(languages).join(', ');
  }

  goToDetail(code: string) {
    console.log('going', code);
    this.router.navigate(['/countries', code]);
  }
}
