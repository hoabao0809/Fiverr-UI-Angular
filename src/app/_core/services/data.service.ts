import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, Observer, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

let urlApi = '';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {
    urlApi = environment.urlApi;
  }

  get(uri: any): Observable<any> {
    const url = `${urlApi}/${uri}`;
    return this.http.get(url).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  post(uri: any, data: any): Observable<any> {
    const url = `${urlApi}/${uri}`;
    return this.http.post(url, data).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  put(uri: any, data: any): Observable<any> {
    const url = `${urlApi}/${uri}`;
    return this.http.put(url, data).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  delete(uri: any): Observable<any> {
    const url = `${urlApi}/${uri}`;
    return this.http.delete(url).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  patch(uri: any, body: any): Observable<any> {
    const url = `${urlApi}/${uri}`;
    return this.http.patch(url, body).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  handleError(error: any) {
    switch (error.status) {
      case 300:
        break;

      case 400:
        break;

      case 401:
        if (error.error.message === 'jwt expired') {
          // Loop through keys localStorage and filter ones'token matching expired token from backend
          const keys: any = Object.keys(localStorage);
          const keyExpired: any = keys.filter((key: any) => {
            const keyInfo: any = localStorage.getItem(key);

            return JSON.parse(keyInfo).token === error.error.data;
          });
          keyExpired.forEach((key: any) => {
            // remove expired token localstorage and inform user
            localStorage.removeItem(key);

            Swal.fire({
              position: 'center',
              icon: 'warning',
              text: 'Session expired, please login again',
              showConfirmButton: true,
            }).then((confirmed) => {
              if (confirmed) {
                location.reload();
              }
            });
          });
        }

        // alert('Error');
        break;
      case 404:
        break;

      case 500:
        break;

      default:
        break;
    }
    return throwError(error);
  }
}
