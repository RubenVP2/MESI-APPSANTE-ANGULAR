import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject = new Subject<any[]>();

  constructor(private http: HttpClient) { }

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
        this.users = response;
        //console.log(this.users[0]);
        this.emitUserSubject();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
