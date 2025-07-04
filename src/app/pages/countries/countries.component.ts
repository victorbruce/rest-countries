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
import { Router } from '@angular/router';
import * as CountryActions from '../../store/actions/country.actions';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Region } from '../../models/country';
import { DropDownComponent } from '../../components/drop-down/drop-down.component';
import { LoaderComponent } from '../../components/loader/loader.component';
@Component({
  selector: 'app-countries',
  imports: [CommonModule, ReactiveFormsModule, DropDownComponent, LoaderComponent],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
})
export class CountriesComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private readonly store = inject(Store);
  private destroy$ = new Subject<void>();
  searchControl = new FormControl('');
  regionControl = new FormControl('');

  countries = this.store.selectSignal(selectFilteredCountries);
  loading = this.store.selectSignal(countryFeature.selectLoading);
  error = this.store.selectSignal(countryFeature.selectError);
  regions: Region[] = Object.values(Region);
  noCountriesFound = computed(
    () => !this.loading() && this.countries().length === 0
  );

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

    this.regionControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((region) => {
        this.store.dispatch(
          CountryActions.setRegionFilter({ region: region || null })
        );
      });
  }

  onSearch(term: string) {
    this.store.dispatch(CountryActions.setSearchTerm({ searchTerm: term }));
  }

  onFilter(region: string) {
    this.store.dispatch(
      CountryActions.setRegionFilter({ region: region || null })
    );
  }

  goToDetail(code: string) {
    this.router.navigate(['/countries', code]);
  }

  onRegionSelected(region: string | null) {
    this.regionControl.setValue(region);
    this.store.dispatch(
      CountryActions.setRegionFilter({ region: region || null })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
