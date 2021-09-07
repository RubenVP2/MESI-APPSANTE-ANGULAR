import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { UsersListeComponent } from './users-liste/users-liste.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { ProgrammesportifslisteComponent } from './programmesportifsliste/programmesportifsliste.component';
import { CreateprogrammesportifsComponent } from './createprogrammesportifs/createprogrammesportifs.component';
import { ProgrammesportifsdetailsComponent } from './programmesportifsdetails/programmesportifsdetails.component';
import { UpdateprogrammesportifsComponent } from './updateprogrammesportifs/updateprogrammesportifs.component';
import { SuggestionbugtrackerComponent } from './suggestionbugtracker/suggestionbugtracker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuggestionbugtrackeradminComponent } from './suggestionbugtracker/suggestionbugtrackeradmin/suggestionbugtrackeradmin.component';
import { SuggestionbugtrackeradmindetailsComponent } from './suggestionbugtracker/suggestionbugtrackeradmin/suggestionbugtrackeradmindetails/suggestionbugtrackeradmindetails.component';
import { ExercicedetailsComponent } from './exercicedetails/exercicedetails.component';
import { CreateexerciceComponent } from './createexercice/createexercice.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    IndexComponent,
    UsersListeComponent,
    ProgrammesportifslisteComponent,
    CreateprogrammesportifsComponent,
    ProgrammesportifsdetailsComponent,
    UpdateprogrammesportifsComponent,
    SuggestionbugtrackerComponent,
    SuggestionbugtrackeradminComponent,
    SuggestionbugtrackeradmindetailsComponent,
    InscriptionComponent,
    ExercicedetailsComponent,
    CreateexerciceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
