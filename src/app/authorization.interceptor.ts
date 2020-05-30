import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return next.handle(request);
    } else {
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + accessToken)
      });
      return next.handle(clonedRequest);
    }
  }
}
