import { Component } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from './sso.config';
import {JwksValidationHandler} from 'angular-oauth2-oidc-jwks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Expensy';
}
