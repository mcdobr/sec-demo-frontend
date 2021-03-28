import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TransactionService} from '../transaction.service';
import {Transaction} from '../transaction';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(private oAuthService: OAuthService,
              private transactionService: TransactionService) {
  }

  displayedColumns: string[] = ['id', 'sum', 'otherParty', 'time'];
  transactions: Observable<Transaction[]> = this.transactionService.getTransactionStream();

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

  get subject() {
    return this.oAuthService.getIdentityClaims()['sub'];
  }
}
