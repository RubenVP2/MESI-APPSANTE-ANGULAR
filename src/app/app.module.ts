import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { UsersListeComponent } from './users-liste/users-liste.component';
import { UserService } from './services/user.service';
import { AddWaterComponent } from './add-water/add-water.component';
import { UserWaterService } from './services/user-water.service';
import { WaterDetailComponent } from './water-detail/water-detail.component';
import { WaterModificationComponent } from './water-modification/water-modification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoriqueWaterComponent } from './historique-water/historique-water.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    IndexComponent,
    UsersListeComponent,
    HistoriqueWaterComponent,
    AddWaterComponent,
    WaterDetailComponent,
    WaterModificationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    UserService,
    UserWaterService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
