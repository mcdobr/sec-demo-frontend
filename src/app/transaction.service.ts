import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Transaction} from './transaction';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {ndjsonStream} from 'can-ndjson-stream';
import {OAuthService} from 'angular-oauth2-oidc';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  apiUrl = environment.apiBaseUri;

  constructor(private httpClient: HttpClient, private oAuthService: OAuthService) {
  }

  // getTransactionStream(): Observable<Transaction[]> {
  getTransactionStream(): any {
    // return this.httpClient.get<Transaction[]>(this.getAllTransactionsUrl);
    const getAllTransactionsUrl = `${this.apiUrl}/transactions`;

    let transactions: Transaction[];


    const obs: Observable<Transaction[]> = new Observable();


    fetch(getAllTransactionsUrl, {
      headers: {
        Accept: 'application/x-ndjson',
        Authorization: `Bearer ${this.oAuthService.getAccessToken()}`
      }
    })
      .then(response => {
        console.log(response.body);
        // const stream = ndjsonStream(response.body);
        // console.log(stream);
        // return stream;
        return response.body;
      })
      .then(stream => {
        let read;
        const reader = stream.getReader();
        reader.read().then(read = (result) => {
          if (result.done) {
            console.log('Done parsing ndjson stream of transactions.');
            return;
          }

          const decodedText = new TextDecoder().decode(result.value);
          const tx = decodedText.split('\n')
            .filter(str => str !== '').map(str => JSON.parse(str));
          console.log(tx);

          obs.subscribe(subscriber => {

          });

          reader.read().then(read); // recurse through the stream
        });
      });
    // return new Observable();
  }

  create(expense: any) {
    console.log('Called service method');
    return this.httpClient.post(`${this.apiUrl}/expenses`, expense).subscribe();
  }
}
