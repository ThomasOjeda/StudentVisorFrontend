import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './material-design/material-design.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { LoginModule } from './login/login.module';
import { ChartModule } from './chart/chart.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
registerLocaleData(localeEs, 'es');

@NgModule({ declarations: [AppComponent, MainPageComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        MaterialDesignModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LoginModule,
        ChartModule,
        SharedModule], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'es' },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
