import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://your-api-url.com'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  // Create operation
  create(url: string , data: any, options?: object): Observable<any> {
    return this.http.post<any>(url, data, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Read operation
  read(url: string): Observable<any> {
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update operation
  update(id: number, data: any): Observable<any> {
    const url = `${this.baseUrl}/resource/${id}`; // Replace 'resource' with your endpoint
    return this.http.put<any>(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete operation
  delete(id: number): Observable<any> {
    const url = `${this.baseUrl}/resource/${id}`; // Replace 'resource' with your endpoint
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

}