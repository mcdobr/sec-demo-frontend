import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CanActivateRouteGuard implements CanActivate {

  constructor(private oAuthService: OAuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> {
    // If already logged in, just return true
    if (this.oAuthService.hasValidIdToken() && this.oAuthService.hasValidAccessToken()) {
      return Promise.resolve(true);
    } else {
      return this.oAuthService.loadDiscoveryDocumentAndTryLogin({})
        .then((result) => {
          return this.oAuthService.hasValidIdToken() && this.oAuthService.hasValidAccessToken();
        })
        .then(hasTokensStored => {
          // if (!hasTokensStored) {
          //   this.router.navigate(['/home']);
          // }
          return hasTokensStored;
        });
    }
  }
}
