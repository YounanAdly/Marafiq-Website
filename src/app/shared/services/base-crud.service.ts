import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseCrudService<T> {
  constructor(
    protected http: HttpClient
  ) { }

  list(apiUrl: string): Observable<T[]> {
    return this.http.get<T[]>(environment.AppConfig.apiBaseUrl + apiUrl).pipe(catchError(this.handleError));
  }

  get(apiUrl: string, id: string | number): Observable<T> {
    return this.http.get<T>(environment.AppConfig.apiBaseUrl + apiUrl + `/${id}`).pipe(catchError(this.handleError));
  }

  create(apiUrl: string, item: T): Observable<T> {
    return this.http.post<T>(environment.AppConfig.apiBaseUrl + apiUrl, item).pipe(catchError(this.handleError));
  }

  update(apiUrl: string, id: string | number, item: T): Observable<T> {
    return this.http.put<T>(environment.AppConfig.apiBaseUrl + apiUrl + `/${id}`, item).pipe(catchError(this.handleError));
  }

  delete(apiUrl: string, id: string | number): Observable<void> {
    return this.http.delete<void>(environment.AppConfig.apiBaseUrl + apiUrl + `/${id}`).pipe(catchError(this.handleError));
  }

  /**
  * Error handling method
  */
  protected handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side / network error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Backend returned unsuccessful response code
      errorMessage = `Server Error [${error.status}]: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
