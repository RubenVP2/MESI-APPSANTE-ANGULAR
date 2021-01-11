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

  emitUserSubject() {
    this.userSubject.next(this.users.slice(0,0));
  }

  // Recupère les utilisateurs
  getAllUsers() {
    return this.http.get<any[]>('http://localhost:5000/test/user/all');

    // this.http.get<any[]>('http://localhost:5000/test/user/all').subscribe(
    //   (response) => {
    //     this.users = response;
    //     console.log('Chargement réussie\n' + this.users[0]);
    //     this.emitUserSubject();
    //   }
    // );
  }
}
