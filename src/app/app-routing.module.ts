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
import {DashboardComponent} from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ExercicedetailsComponent } from './exercicedetails/exercicedetails.component';
import { CreateexerciceComponent } from './createexercice/createexercice.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'users', component: UsersListeComponent , canActivate: [AuthGuard]},
  { path: 'programmesportifsliste', component: ProgrammesportifslisteComponent},
  { path: 'programmesportifsdetails/:id', component: ProgrammesportifsdetailsComponent},
  { path: 'createprogrammessportifs', component: CreateprogrammesportifsComponent},
  { path: 'programmesportifsdetails/:id/updateprogrammesportifs', component: UpdateprogrammesportifsComponent},
  { path: 'feedbacksadmin', component: SuggestionbugtrackeradminComponent,canActivate: [AuthGuard]}, // TODO : authguard admin
  { path: 'feedbacksadmindetails/:id', component: SuggestionbugtrackeradmindetailsComponent,canActivate: [AuthGuard]}, // TODO : authguard admin
  { path: 'inscription', component: InscriptionComponent },
  { path: 'exercice/:id', component: ExercicedetailsComponent},
  { path: 'programmesportifsdetails/:id/createexercice', component: CreateexerciceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
