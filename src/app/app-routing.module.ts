import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddWaterComponent } from './add-water/add-water.component';
import { HistoriqueWaterComponent } from './historique-water/historique-water.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { UsersListeComponent } from './users-liste/users-liste.component';
import { WaterDetailComponent } from './water-detail/water-detail.component';
import { WaterModificationComponent } from './water-modification/water-modification.component';

const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'login', component: LoginComponent},
  { path: 'users', component: UsersListeComponent},
  { path: 'addWater', component: AddWaterComponent},
  { path: 'historiqueWater', component: HistoriqueWaterComponent},
  { path: 'historiqueWater/view/:id', component: WaterDetailComponent},
  { path: 'historiqueWater/modification/:id', component: WaterModificationComponent},
  { path: 'historiqueWater/addWater', component: AddWaterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
