import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TransactionTableComponent} from './transaction-table/transaction-table.component';


const routes: Routes = [
  {path: 'transaction-table', component: TransactionTableComponent},
  {path: '**', redirectTo: 'transaction-table'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
