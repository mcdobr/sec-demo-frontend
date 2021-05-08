import {Component} from '@angular/core';
import {OAuthErrorEvent, OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from './sso.config';
import {JwksValidationHandler} from 'angular-oauth2-oidc-jwks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Expensy';

  constructor(private oAuthService: OAuthService) {
    this.configure();
  }

  private configure() {
    // Debugging purposes
    this.oAuthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error('OAuthError Event Object:', event);
      } else {
        console.warn('Oauth2Event: ', event);
      }
    });

    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }
}
