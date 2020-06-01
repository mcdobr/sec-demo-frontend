import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HomeComponent} from './home/home.component';
import {AuthorizationInterceptor} from './authorization.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { ExpenseOverviewComponent } from './home/expense-overview/expense-overview.component';
import {IncomeOverviewComponent} from './home/remuneration/income-overview.component';
import { CreateExpenseModalComponent } from './home/modals/create-expense-modal/create-expense-modal.component';
import {MatIconModule} from '@angular/material/icon';
import { ExpenseFormComponent } from './home/expense-form/expense-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpenseOverviewComponent,
    IncomeOverviewComponent,
    CreateExpenseModalComponent,
    ExpenseFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8080'],
        sendAccessToken: true
      }
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [ExpenseFormComponent]
})
export class AppModule {
}
