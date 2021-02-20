import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { UsersListeComponent } from './users-liste/users-liste.component';

const routes: Routes = [
  //Après la virgule, utiliser canActivate: [AuthGuard]. ça permet de proteger votre url (l'utilisateur doit être connecté).
  { path: '' , component: IndexComponent},
  { path: 'login' , component: LoginComponent},
  { path: 'users' , component: UsersListeComponent},
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
 // { path:'not-found', component: FourOhFourComponent}, //Path pour le component du not-found
  //{ path:'**', redirectTo: '/not-found'} // Path qui permet de rediriger tous les urls inconnu par l'application sur l'url not-found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
