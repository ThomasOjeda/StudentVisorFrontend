import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard-component/dashboard.component';
import { LoginComponent } from './login/login-component/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: MainPageComponent,
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'publish',
        loadChildren: () =>
          import('./publish/publish.module').then((m) => m.PublishModule),
      },
      {
        path: 'files',
        loadChildren: () =>
          import('./files/files.module').then((m) => m.FilesModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
