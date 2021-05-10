import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({providedIn: 'root'})
export class CanActivateRouteGuard implements CanActivate {

  constructor(private oAuthService: OAuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Promise<boolean> {
    // If already logged in, just return true
    if (this.oAuthService.hasValidIdToken() && this.oAuthService.hasValidAccessToken()) {
      return Promise.resolve(true);
    } else {
      return this.oAuthService.loadDiscoveryDocumentAndTryLogin({})
        .then((result) => {
          // todo: in angular-oauth2-oidc, after the redirect, the tokens are not immediately available in session storage
          //  and the writing to session storage is done in an async fashion, but as far as i can tell you can not get a promise to
          //  an access token. Anyway, there's a race condition and you need to implement some watcher session storage or
          //  on hasValidAccessToken(). I've wasted too much time on this already, here is the issue on GitHub:
          //  https://github.com/manfredsteyer/angular-oauth2-oidc/issues/221
          //  and here is a pretty nice solution
          //  https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/blob/master/src/app/core/auth.service.ts
          //  For this simple demo, i've just put a busy loop big enough to kill the race condition.
          for (let i = 0; i < 100000; ++i) {
            // tslint:disable-next-line:no-console
            console.debug('something');
          }

          return this.oAuthService.hasValidIdToken() && this.oAuthService.hasValidAccessToken();
        })
        .then(hasTokensStored => {
          if (!hasTokensStored) {
            this.router.navigate(['/home']);
          }
          return hasTokensStored;
        });
    }
  }
}
