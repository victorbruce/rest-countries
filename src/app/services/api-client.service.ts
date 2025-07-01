import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, retry, of, tap } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

export interface ApiRequestOptions {
  retryCount?: number;
  params?: HttpParams | { [param: string]: string | number | boolean };
  headers?: HttpHeaders | { [header: string]: string | string[] };
}

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  get<T>(url: string, options: ApiRequestOptions = {}): Observable<T> {
    return this.http
      .get<T>(url, {
        params: this.buildParams(options.params),
        headers: this.buildHeaders(options.headers),
      })
      .pipe(
        retry(options.retryCount ?? 2),
        catchError((error) => {
          const message = this.errorHandler.getErrorMessage(error);
          return throwError(() => new Error(message));
        })
      );
  }

  post<T>(
    url: string,
    body: T,
    options: ApiRequestOptions = {}
  ): Observable<T> {
    return this.http
      .post<T>(url, body, {
        params: this.buildParams(options.params),
        headers: this.buildHeaders(options.headers),
      })
      .pipe(
        retry(options.retryCount ?? 2),
        catchError((error) => {
          const message = this.errorHandler.getErrorMessage(error);
          return throwError(() => new Error(message));
        })
      );
  }

  put<T>(url: string, body: T, options: ApiRequestOptions = {}): Observable<T> {
    return this.http
      .put<T>(url, body, {
        params: this.buildParams(options.params),
        headers: this.buildHeaders(options.headers),
      })
      .pipe(
        retry(options.retryCount ?? 2),
        catchError((error) => {
          const message = this.errorHandler.getErrorMessage(error);
          return throwError(() => new Error(message));
        })
      );
  }

  delete(url: string, options: ApiRequestOptions = {}): Observable<void> {
    return this.http
      .delete<void>(url, {
        params: this.buildParams(options.params),
        headers: this.buildHeaders(options.headers),
      })
      .pipe(
        retry(options.retryCount ?? 2),
        catchError((error) => {
          const message = this.errorHandler.getErrorMessage(error);
          return throwError(() => new Error(message));
        })
      );
  }

  private buildParams(
    params?: HttpParams | { [param: string]: string | number | boolean }
  ): HttpParams | undefined {
    if (!params) return undefined;
    if (params instanceof HttpParams) return params;

    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      httpParams = httpParams.set(key, value.toString());
    });
    return httpParams;
  }

  private buildHeaders(
    headers?: HttpHeaders | { [header: string]: string | string[] }
  ): HttpHeaders | undefined {
    if (!headers) return undefined;
    if (headers instanceof HttpHeaders) return headers;

    let httpHeaders = new HttpHeaders();
    Object.entries(headers).forEach(([key, value]) => {
      httpHeaders = httpHeaders.set(key, value);
    });
    return httpHeaders;
  }
}
