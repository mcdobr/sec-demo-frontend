import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TransactionService} from '../transaction.service';
import {Transaction} from '../transaction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(private oAuthService: OAuthService, private transactionService: TransactionService) {
  }

  displayedColumns: string[] = ['id', 'sum', 'friend', 'createdAt'];
  transactions: Transaction[] = [
    {id: '2131', sum: 200, sender: '123', receiver: '423', createdAt: new Date(), lastModifiedAt: new Date(), category: 'MOCK', description: 'description'}
  ];

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

  public principalIsSender(transaction: Transaction) {
    return transaction.sender === this.subject;
  }

  get subject() {
    return this.oAuthService.getIdentityClaims()["sub"];
  }
}
