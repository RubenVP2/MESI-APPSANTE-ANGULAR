import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { NewUser } from '../models/NewUser.model';
import { Router } from '@angular/router';


import { Subject } from 'rxjs';
import { LogUser } from '../models/LogUser.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject = new Subject<any[]>();

  constructor(private http: HttpClient,private router : Router) { }

  private users: User[] = [];

  private urlApi = "http://localhost:5000";

  emitUserSubject() {
    this.userSubject.next(this.users.slice());
  }

  // Recupère les utilisateurs
  getUsersApi() {
    // Requete http pour récupéreer les utilisateurs
    // return this.http.get<any[]>(this.urlApi + '/test/user/all');
    this.http.get<any[]>(this.urlApi + '/test/user/all').subscribe(
      (response) => {
        this.users = response['users'];
        //console.log(this.users[0]);
        this.emitUserSubject();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addUser(user: NewUser) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(user);
    this.http.post<any>(this.urlApi + "/register", body, {'headers':headers}).subscribe((response) => {
        var message = response['message'];
        if (message == "Inscription réussie"){
          alert(message);
          this.router.navigate(['/login']);
        }
        else {
          alert(message);
        }
},(error) => {
      console.log(error);
    });
  }

  login(loguser: LogUser){
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(loguser);
    this.http.post<any>(this.urlApi + '/login', body, {'headers':headers}).subscribe((response) => {
            var message = response['message'];
            if (message == "Connexion réussie"){
              var user = response['user'];
              alert("Bienvenue "+ user);
              sessionStorage.setItem("user",user)
              this.router.navigate(['/users']);
            }
            else {
              alert(message);
            }
    },(error) => {
      console.log(error);
    });
  }
  
}
