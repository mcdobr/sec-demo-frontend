import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Expense} from './expense';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  apiUrl = environment.apiBaseUri;

  constructor(private httpClient: HttpClient) { }

  getExpenses(): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(`${this.apiUrl}/expenses`);
  }
}
