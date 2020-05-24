import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private oAuthService: OAuthService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  logout() {
    this.oAuthService.logOut();
  }

  public get name() {
    const claims = this.oAuthService.getIdentityClaims();
    if (!claims) {
      return null;
    } else {
      return claims;
    }
  }
}
