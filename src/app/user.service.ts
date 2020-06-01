import { Injectable } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
              private oAuthService: OAuthService) { }

  mergeUser() {
    this.httpClient.put(`${environment.apiBaseUri}/users/${this.oAuthService.getIdentityClaims()['sub']}`, {}).subscribe();
  }
}
