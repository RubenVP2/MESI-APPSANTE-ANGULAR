import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddWaterComponent } from './add-water/add-water.component';
import { AuthGuard } from './auth.guard';
import { HistoriqueWaterComponent } from './historique-water/historique-water.component';
import { IndexComponent } from './index/index.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { UsersListeComponent } from './users-liste/users-liste.component';
import { WaterDetailComponent } from './water-detail/water-detail.component';
import { WaterModificationComponent } from './water-modification/water-modification.component';

const routes: Routes = [
  { path: 'accueil', component: IndexComponent},
  { path: 'login', component: LoginComponent},
  { path: 'users', component: UsersListeComponent ,canActivate: [AuthGuard]},
  { path: 'inscription', component: InscriptionComponent },
  { path: 'addWater', component: AddWaterComponent, canActivate: [AuthGuard]},
  { path: 'historiqueWater', component: HistoriqueWaterComponent, canActivate: [AuthGuard]} ,
  { path: 'historiqueWater/modification/:id', component: WaterModificationComponent, canActivate: [AuthGuard]},
  { path: 'historiqueWater/view/:id', component: WaterDetailComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
