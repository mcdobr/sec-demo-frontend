import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TransactionTableComponent} from './transaction-table/transaction-table.component';
import {CanActivateRouteGuard} from './can-activate-route.guard';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'transaction-table', component: TransactionTableComponent/*, canActivate: [CanActivateRouteGuard]*/},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
