import {Component, OnInit} from '@angular/core';
import {ExpenseService} from '../../expense.service';
import {Observable} from 'rxjs';
import {Expense} from '../../expense';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogConfig} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {ExpenseFormComponent} from '../expense-form/expense-form.component';

@Component({
  selector: 'app-expenses-overview',
  templateUrl: './expense-overview.component.html',
  styleUrls: ['./expense-overview.component.css']
})
export class ExpenseOverviewComponent implements OnInit {
  expensesDataSource: ExpensesDataSource;

  constructor(private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    this.expensesDataSource = new ExpensesDataSource(this.expenseService);
  }

  openCreateExpenseDialog() {
    // this.createDialog.open(ExpenseFormComponent, {
    //   height: '600px',
    //   width: '400px'
    // });
  }
}

export class ExpensesDataSource extends DataSource<Expense> {
  constructor(private expenseService: ExpenseService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Expense[] | ReadonlyArray<Expense>> {
    return this.expenseService.getExpenses();
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }
}
