import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from '../sso.config';
import {JwksValidationHandler} from 'angular-oauth2-oidc-jwks';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authentication-bar',
  templateUrl: './authentication-bar.component.html',
  styleUrls: ['./authentication-bar.component.css']
})
export class AuthenticationBarComponent implements OnInit {

  constructor(public oAuthService: OAuthService,
              private router: Router) {
    this.configure();
  }

  private configure() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  ngOnInit(): void {
  }

  login() {
    console.log('Logging in: redirecting to Identity provider');
    this.oAuthService.initCodeFlow();
  }

  logout() {
    console.log('Logging out');
    this.oAuthService.logOut();
    this.router.navigate(['home']);
  }
}
