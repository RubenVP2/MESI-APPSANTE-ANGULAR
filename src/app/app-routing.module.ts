import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateprogrammesportifsComponent } from './createprogrammesportifs/createprogrammesportifs.component';
import { IndexComponent } from './index/index.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { ProgrammesportifsdetailsComponent } from './programmesportifsdetails/programmesportifsdetails.component';
import { ProgrammesportifslisteComponent } from './programmesportifsliste/programmesportifsliste.component';
import { UpdateprogrammesportifsComponent } from './updateprogrammesportifs/updateprogrammesportifs.component';
import { SuggestionbugtrackerComponent } from './suggestionbugtracker/suggestionbugtracker.component';
import { SuggestionbugtrackeradminComponent } from './suggestionbugtracker/suggestionbugtrackeradmin/suggestionbugtrackeradmin.component';
import { SuggestionbugtrackeradmindetailsComponent } from './suggestionbugtracker/suggestionbugtrackeradmin/suggestionbugtrackeradmindetails/suggestionbugtrackeradmindetails.component';
import { UsersListeComponent } from './users-liste/users-liste.component';
import { AuthGuard } from './auth.guard'

const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'login', component: LoginComponent},
  { path: 'programmesportifsliste', component: ProgrammesportifslisteComponent},
  { path: 'programmesportifsdetails', component: ProgrammesportifsdetailsComponent},
  { path: 'createprogrammessportifs', component: CreateprogrammesportifsComponent},
  { path: 'updateprogrammesportifs', component: UpdateprogrammesportifsComponent},
  { path: 'users', component: UsersListeComponent ,canActivate: [AuthGuard]},
  { path: 'feedbacksadmin', component: SuggestionbugtrackeradminComponent,canActivate: [AuthGuard]}, // TODO : authguard admin
  { path: 'feedbacksadmindetails/:id', component: SuggestionbugtrackeradmindetailsComponent,canActivate: [AuthGuard]}, // TODO : authguard admin
  { path: 'inscription', component: InscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
