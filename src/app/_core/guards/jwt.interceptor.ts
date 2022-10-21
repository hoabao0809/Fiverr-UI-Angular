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
      headers: req.headers
        .set('token', `${authToken}`)
        // .set('token', `${adminToken}`)
        // .set(
        //   'tokenByClass',
        //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxNCIsIkhldEhhblN0cmluZyI6IjE1LzA0LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0OTk4MDgwMDAwMCIsIm5iZiI6MTYyMTE4NDQwMCwiZXhwIjoxNjUwMTI4NDAwfQ.43sCqLD_V6VUJP8qZLQSWO07uCIDI7bS5MGR92deYb8'
        // ),
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
