import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './material-design/material-design.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './users/users.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserDetailsComponent } from './users/user-details/user-details.component';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { NewUserComponent } from './users/new-user/new-user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { PublishComponent } from './publish/publish.component';
import { NewFileComponent } from './files/new-file/new-file.component';
import { FilesComponent } from './files/files.component';
import { FileListComponent } from './files/file-list/file-list.component';
import { LoginModule } from './login/login.module';
import { ChartModule } from './chart/chart.module';
import { DashboardModule } from './dashboard/dashboard.module';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    UsersComponent,
    UserDetailsComponent,
    NewUserComponent,
    UserListComponent,
    NewFileComponent,
    FilesComponent,
    FileListComponent,
    PublishComponent,
  ],
  imports: [
    BrowserModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    ChartModule,
    DashboardModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
