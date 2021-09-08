import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { NewUser } from '../models/NewUser.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';



import { Subject } from 'rxjs';
import { LogUser } from '../models/LogUser.model';
import {error} from 'protractor';
import {map} from 'rxjs/operators';

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
        //users etant le nom de {} dans l'url de l'api
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
          Swal.fire(message);
          this.router.navigate(['/login']);
        }
        else {
          Swal.fire(message);
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
              Swal.fire("Bienvenue "+ user);
              sessionStorage.setItem("user",user)
              this.router.navigate(['/']);
            }
            else {
              Swal.fire(message);
            }
    },(error) => {
      console.log(error);
    });
  }

  isAdmin(pUsername: string) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({ username: pUsername});
    console.log(body);
    this.http.post<any>(this.urlApi + `/isAdmin`, body, {'headers' : headers}).subscribe((response) => {
      this.users = response['role'];
      //console.log(this.users[0]);
      this.emitUserSubject();
    },(error) =>
    {
      console.log(error);
    });
  }

  async updateProfil(oldUsername: string, user: LogUser) {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify({user});
    await this.http.post<any>(`${this.urlApi}/user/${oldUsername}`, body, {'headers': headers})
      .pipe(map(res => {
        sessionStorage.setItem('user', user.username);
      })).toPromise();
  }

}
