import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { UsersListeComponent } from './users-liste/users-liste.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard'

const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'users', component: UsersListeComponent , canActivate: [AuthGuard]},
  { path: 'inscription', component: InscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
