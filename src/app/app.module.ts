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
import { AuthGuard } from './services/auth-guard.service';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    IndexComponent,
    UsersListeComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
