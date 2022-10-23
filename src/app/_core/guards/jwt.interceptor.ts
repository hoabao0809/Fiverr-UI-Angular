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
    let adminToken = '';

    if (localStorage.getItem('UserAdmin')) {
      const adminInfo: any = localStorage.getItem('UserAdmin');
      adminToken = JSON.parse(adminInfo).token;
    } 
    if (localStorage.getItem('ClientUser')) {
      const userInfo: any = localStorage.getItem('ClientUser');
      authToken = JSON.parse(userInfo).token;
    }

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.

    const authReq = req.clone({
      headers: req.headers
        .set('Authorization', 'Bearer ' + `${adminToken}`)
        .set('Authentication', `${authToken}`),
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
