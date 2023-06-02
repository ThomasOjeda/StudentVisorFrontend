import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './material-design/material-design.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ChartComponent } from './chart/chart.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { NewUserComponent } from './users/new-user/new-user.component';
import { UserListComponent } from './users/user-list/user-list.component';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent,
    UsersComponent,
    DashboardComponent,
    ChartComponent,
    UserDetailsComponent,
    NewUserComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent],
})
export class AppModule {}
