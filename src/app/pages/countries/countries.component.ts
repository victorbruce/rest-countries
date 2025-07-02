import {
  Component,
  computed,
  inject,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  countryFeature,
  selectFilteredCountries,
} from '../../store/reducers/country.reducers';
import * as CountryActions from '../../store/actions/country.actions';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-countries',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
})
export class CountriesComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private destroy$ = new Subject<void>();
  searchControl = new FormControl('');

  countries = this.store.selectSignal(selectFilteredCountries);
  loading = this.store.selectSignal(countryFeature.selectLoading);
  error = this.store.selectSignal(countryFeature.selectError);
  // filteredCountries = this.store.selectSignal(countryFeature.selectSearchTerm);

  constructor() {
    this.store.dispatch(CountryActions.loadCountries());
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((searchTerm) => {
        this.store.dispatch(
          CountryActions.setSearchTerm({ searchTerm: searchTerm || '' })
        );
      });
  }

  onSearch(term: string) {
    this.store.dispatch(CountryActions.setSearchTerm({ searchTerm: term }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
