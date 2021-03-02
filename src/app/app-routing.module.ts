import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { SuggestionbugtrackerComponent } from './suggestionbugtracker/suggestionbugtracker.component';
import { SuggestionbugtrackeradminComponent } from './suggestionbugtracker/suggestionbugtrackeradmin/suggestionbugtrackeradmin.component';
import { SuggestionbugtrackeradmindetailsComponent } from './suggestionbugtracker/suggestionbugtrackeradmin/suggestionbugtrackeradmindetails/suggestionbugtrackeradmindetails.component';
import { UsersListeComponent } from './users-liste/users-liste.component';

const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'login', component: LoginComponent},
  { path: 'users', component: UsersListeComponent},
  { path: 'suggestionbugtracker', component: SuggestionbugtrackerComponent}, // TODO : Route à supprimer avant release
  { path: 'suggestionbugtrackeradmin', component: SuggestionbugtrackeradminComponent}, // TODO : authguard
  { path: 'suggestionbugtrackeradmindetails', component: SuggestionbugtrackeradmindetailsComponent} // TODO : authguard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
