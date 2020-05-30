import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HomeComponent} from './home/home.component';
import {AuthorizationInterceptor} from './authorization.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
