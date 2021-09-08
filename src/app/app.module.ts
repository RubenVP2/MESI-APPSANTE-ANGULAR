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
import { UserService } from './services/user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import {FooterComponent} from './footer/footer.component';
import { ProfilComponent } from './profil/profil.component';
import { AddWaterComponent } from './add-water/add-water.component';
import { UserWaterService } from './services/user-water.service';
import { WaterDetailComponent } from './water-detail/water-detail.component';
import { WaterModificationComponent } from './water-modification/water-modification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoriqueWaterComponent } from './historique-water/historique-water.component';
import { DatePipe } from '@angular/common';
import { CalculCaloriesComponent } from './calcul-calories/calcul-calories.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    IndexComponent,
    UsersListeComponent,
    DashboardComponent,
    UsersListeComponent,
    InscriptionComponent,
    ProgrammesportifslisteComponent,
    CreateprogrammesportifsComponent,
    ProgrammesportifsdetailsComponent,
    UpdateprogrammesportifsComponent,
    SuggestionbugtrackerComponent,
    SuggestionbugtrackeradminComponent,
    SuggestionbugtrackeradmindetailsComponent,
    ExercicedetailsComponent,
    CreateexerciceComponent,
    FooterComponent,
    FourOhFourComponent,
    ProfilComponent,
    HistoriqueWaterComponent,
    AddWaterComponent,
    WaterModificationComponent,
    InscriptionComponent,
    WaterDetailComponent,
    LandingpageComponent,
    WaterDetailComponent,
    CalculCaloriesComponent
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
    UserService,
    UserWaterService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [WaterDetailComponent]
})
export class AppModule { }
