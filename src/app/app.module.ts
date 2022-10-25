import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './_core/guards/jwt.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_core/shares/material-module';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, DatePipe
  
    // ,BreadcrumbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
