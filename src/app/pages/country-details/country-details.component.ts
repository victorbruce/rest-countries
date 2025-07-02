import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

import {
  countryFeature,
  selectSelectedCountry,
} from '../../store/reducers/country.reducers';
import * as CountryActions from '../../store/actions/country.actions';

@Component({
  selector: 'app-country-details',
  imports: [CommonModule],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
})
export class CountryDetailsComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  country = this.store.selectSignal(selectSelectedCountry);
  loading = this.store.selectSignal(countryFeature.selectLoading);
  error = this.store.selectSignal(countryFeature.selectError);

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (!code) return;

    const existingCountry = this.country();
    if (!existingCountry || existingCountry.cca3 !== code) {
      this.store.dispatch(CountryActions.loadCountryByCode({ code }));
    }
  }

  goBack() {
    this.location.back();
  }
}
