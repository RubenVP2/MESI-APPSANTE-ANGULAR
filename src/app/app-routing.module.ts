import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateprogrammesportifsComponent } from './createprogrammesportifs/createprogrammesportifs.component';
import { AddWaterComponent } from './add-water/add-water.component';
import { HistoriqueWaterComponent } from './historique-water/historique-water.component';
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
import {FourOhFourComponent} from './four-oh-four/four-oh-four.component';
import {ProfilComponent} from './profil/profil.component';
import { WaterDetailComponent } from './water-detail/water-detail.component';
import { WaterModificationComponent } from './water-modification/water-modification.component';
import {FormMensurationWeightComponent} from './form-mensuration-weight/form-mensuration-weight.component';
import {HistoriqueWeightComponent} from './historique-weight/historique-weight.component';
import {WeightModificationComponent} from './weight-modification/weight-modification.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

const routes: Routes = [
  { path: '', component: LandingpageComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'users', component: UsersListeComponent , canActivate: [AuthGuard]},
  { path: 'programmesportifsliste', component: ProgrammesportifslisteComponent},
  { path: 'programmesportifsdetails/:id', component: ProgrammesportifsdetailsComponent},
  { path: 'createprogrammessportifs', component: CreateprogrammesportifsComponent},
  { path: 'programmesportifsdetails/:id/updateprogrammesportifs', component: UpdateprogrammesportifsComponent},
  { path: 'feedbacksadmin', component: SuggestionbugtrackeradminComponent, canActivate: [AuthGuard]}, // TODO : authguard admin
  { path: 'feedbacksadmindetails/:id', component: SuggestionbugtrackeradmindetailsComponent, canActivate: [AuthGuard]}, // TODO : authguard admin
  { path: 'inscription', component: InscriptionComponent },
  { path: 'exercice/:id', component: ExercicedetailsComponent},
  { path: 'programmesportifsdetails/:id/createexercice', component: CreateexerciceComponent},
  { path: 'addWater', component: AddWaterComponent, canActivate: [AuthGuard]},
  { path: 'historiqueWater', component: HistoriqueWaterComponent, canActivate: [AuthGuard]} ,
  { path: 'historiqueWater/modification/:id', component: WaterModificationComponent, canActivate: [AuthGuard]},
  { path: 'historiqueWater/view/:id', component: WaterDetailComponent, canActivate: [AuthGuard]},
  { path: 'historiqueWeight/modification/:id', component: WeightModificationComponent, canActivate: [AuthGuard]},
  { path: 'addWeight', component: FormMensurationWeightComponent, canActivate: [AuthGuard]},
  { path: 'historiqueWeight', component: HistoriqueWeightComponent, canActivate: [AuthGuard]} ,
  { path: 'not-found', component: FourOhFourComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
