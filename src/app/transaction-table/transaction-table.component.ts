import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Observable} from 'rxjs';
import {TransactionService} from '../transaction.service';
import {Transaction} from '../transaction';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})

export class TransactionTableComponent implements OnInit {
  constructor(private oAuthService: OAuthService,
              private transactionService: TransactionService) {
  }

  displayedColumns: string[] = ['id', 'sum', 'otherParty', 'type', 'createdAt'];
  transactions: Observable<Transaction[]>;

  ngOnInit(): void {
    this.transactions = this.transactionService.getTransactionStream();
  }

  get subject() {
    return this.oAuthService.getIdentityClaims()['sub'];
  }
}
