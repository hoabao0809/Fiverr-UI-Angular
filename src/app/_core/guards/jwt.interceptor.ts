import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    let authToken = '';

    if (localStorage.getItem('UserAdmin')) {
      const userInfo: any = localStorage.getItem('UserAdmin');
      authToken = JSON.parse(userInfo).token;
    } else if (localStorage.getItem('ClientUser')) {
      const userInfo: any = localStorage.getItem('ClientUser');
      authToken = JSON.parse(userInfo).token;
    }

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.

    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + `${authToken}`),
      // .set('token', `${adminToken}`)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
