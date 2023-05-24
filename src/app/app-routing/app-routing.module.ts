import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UsersComponent } from '../users/users.component';
import { LoginComponent } from '../login/login.component';
import { MainPageComponent } from '../main-page/main-page.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: MainPageComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: '**', component: DashboardComponent },
    ],
  },
  { path: '**', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
