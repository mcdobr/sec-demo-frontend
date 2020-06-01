import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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
    this.oAuthService.initCodeFlow();
  }

  logout() {
    this.oAuthService.logOut();
  }

  public get isAuthenticated() {
    return this.oAuthService.hasValidAccessToken();
  }
}
