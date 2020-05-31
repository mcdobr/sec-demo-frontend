import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private oAuthService: OAuthService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  login() {
    this.oAuthService.initCodeFlow();
  }

  logout() {
    this.oAuthService.logOut();
  }

  getHello() {
    this.httpClient.get('http://localhost:8080/api/users/hello').subscribe();
  }

  mergeUser() {
    if (this.oAuthService.hasValidAccessToken()) {
      this.httpClient.put(`http://localhost:8080/api/users/${this.oAuthService.getIdentityClaims()['sub']}`, {}).subscribe();
    }
  }


  public get name() {
    const claims = this.oAuthService.getIdentityClaims();
    if (!claims) {
      return null;
    } else {
      return claims['given_name'];
    }
  }

  public get isAuthenticated() {
    return this.oAuthService.hasValidAccessToken();
  }
}
