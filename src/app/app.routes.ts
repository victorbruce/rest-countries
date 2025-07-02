import { Routes } from '@angular/router';
import { CountriesComponent } from './pages/countries/countries.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';

export const routes: Routes = [
  {
    path: '',
    component: CountriesComponent,
    title: 'Home',
  },
  {
    path: 'countries/:code',
    component: CountryDetailsComponent,
    title: 'Country',
  },
];
