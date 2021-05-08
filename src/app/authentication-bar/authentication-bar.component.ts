import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authentication-bar',
  templateUrl: './authentication-bar.component.html',
  styleUrls: ['./authentication-bar.component.css']
})
export class AuthenticationBarComponent implements OnInit {

  constructor(public oAuthService: OAuthService,
              private router: Router) {
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
