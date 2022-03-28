import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/home/helper/token.interceptor';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],

  providers: [
      {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
