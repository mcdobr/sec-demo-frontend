import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private oAuthService: OAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.oAuthService.getAccessToken();
    if (!accessToken) {
      return next.handle(request);
    } else {
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      });
      return next.handle(clonedRequest);
    }
  }
}
