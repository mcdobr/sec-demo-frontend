import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Transaction} from './transaction';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  apiUrl = environment.apiBaseUri;

  constructor(private httpClient: HttpClient) {
  }

  getTransactionStream(): Observable<Transaction[]> {
    // return this.httpClient.get<Transaction[]>(this.getAllTransactionsUrl);
    const getAllTransactionsUrl = `${this.apiUrl}/transactions`;
    return new Observable<Transaction[]>((observer) => {
      const eventSource = new EventSource(getAllTransactionsUrl);
      eventSource.onmessage = (event) => {
        console.log('Received event: ', event);
        const json = JSON.parse(event.data);
        observer.next([
            new Transaction(
              json['id'],
              json['sum'],
              json['otherParty'],
              json['type'],
              json['createdAt'],
              json['lastModifiedAt'],
              json['description']
            )
          ]
        );
      };
      eventSource.onerror = (error) => {
        if (eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      };
    });
  }

  create(expense: any) {
    console.log('Called service method');
    return this.httpClient.post(`${this.apiUrl}/expenses`, expense).subscribe();
  }
}
