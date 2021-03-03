import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateprogrammesportifsComponent } from './createprogrammesportifs/createprogrammesportifs.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ProgrammesportifsdetailsComponent } from './programmesportifsdetails/programmesportifsdetails.component';
import { ProgrammesportifslisteComponent } from './programmesportifsliste/programmesportifsliste.component';
import { UpdateprogrammesportifsComponent } from './updateprogrammesportifs/updateprogrammesportifs.component';
import { UsersListeComponent } from './users-liste/users-liste.component';

const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'login', component: LoginComponent},
  { path: 'users', component: UsersListeComponent},
  { path: 'programmesportifsliste', component: ProgrammesportifslisteComponent},
  { path: 'programmesportifsdetails', component: ProgrammesportifsdetailsComponent},
  { path: 'createprogrammessportifs', component: CreateprogrammesportifsComponent},
  { path: 'updateprogrammesportifs', component: UpdateprogrammesportifsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
