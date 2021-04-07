import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Transaction} from './transaction';
import {environment} from '../environments/environment';
import {Observable, Subject} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';
import ndjsonStream from 'can-ndjson-stream';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  apiUrl = environment.apiBaseUri;

  transactions: Transaction[] = [];
  transactionsSubject: Subject<Transaction[]> = new Subject<Transaction[]>();

  constructor(private httpClient: HttpClient,
              private oAuthService: OAuthService) {
  }

  getTransactionStream(): Observable<Transaction[]> {
    const getAllTransactionsUrl = `${this.apiUrl}/transactions`;

    fetch(getAllTransactionsUrl, {
      headers: {
        Accept: 'application/x-ndjson',
        Authorization: `Bearer ${this.oAuthService.getAccessToken()}`
      }
    })
      .then(response => {
        // Like most frameworks, stream are CONSUME-ONCE, so don't log here anything.
        return ndjsonStream(response.body);
      })
      .then(stream => {
        let read;
        const reader = stream.getReader();
        reader.read().then(read = (result) => {
          if (result.done) {
            console.log('Done parsing ndjson stream of transactions.');
            this.transactionsSubject.complete();
            return;
          } else {
            const decodedTransaction: Transaction = result.value;
            // console.log(decodedTransaction);

            // Add to the array of transactions and push a notification
            this.transactions.push(decodedTransaction);
            // console.log(this.transactions);
            this.transactionsSubject.next(this.transactions);
            reader.read().then(read); // recurse through the stream
          }
        });
      });
    return this.transactionsSubject.asObservable();
  }

  create(expense: any) {
    console.log('Called service method');
    return this.httpClient.post(`${this.apiUrl}/expenses`, expense).subscribe();
  }
}
