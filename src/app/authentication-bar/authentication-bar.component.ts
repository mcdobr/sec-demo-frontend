import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-authentication-bar',
  templateUrl: './authentication-bar.component.html',
  styleUrls: ['./authentication-bar.component.css']
})
export class AuthenticationBarComponent implements OnInit {

  constructor(public oAuthService: OAuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.oAuthService.initCodeFlow();
  }

  logout() {
    this.oAuthService.logOut();
  }
}
