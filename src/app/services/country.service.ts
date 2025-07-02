import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { Country } from '../models/country';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly API_URL = environment.apiUrl;
  private apiClient = inject(ApiClientService);

  constructor() {}

  getCountries(): Observable<Country[]> {
    return this.apiClient.get<Country[]>(`${this.API_URL}/all`, {
      retryCount: 0,
      params: { fields: 'name,population,region,capital,flags,cca3,borders' },
    });
  }

  getCountryByCode(code: string) {
    return this.apiClient
      .get<Country[]>(`${this.API_URL}/alpha/${code}`)
      .pipe(map((countries: Country[]) => countries[0]));
  }
}
