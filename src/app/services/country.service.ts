import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.apiClient.get<Country[]>(this.API_URL, {
      retryCount: 0,
      params: { fields: 'name,population,region,capital,flag' },
    });
  }
}
