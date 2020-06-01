import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ExpenseService} from '../../expense.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    sum: new FormControl(''),
    category: new FormControl('')
  });

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
  }

  submitForm() {
    console.log(this.formGroup.value);
    this.expenseService.create(this.formGroup.value);
  }
}
