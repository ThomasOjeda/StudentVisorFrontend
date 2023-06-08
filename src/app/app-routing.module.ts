import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { PublishComponent } from './chart/publish/publish.component';
import { FilesComponent } from './files/files.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: MainPageComponent,
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'publish', component: PublishComponent },
      { path: 'files', component: FilesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/:id', component: UserDetailsComponent },
      { path: '**', redirectTo:'dashboard' },
    ],
  },
  { path: '**', redirectTo:'' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
