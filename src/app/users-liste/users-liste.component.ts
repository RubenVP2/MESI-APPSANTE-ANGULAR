import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';



@Component({
  selector: 'app-users-liste',
  templateUrl: './users-liste.component.html',
  styleUrls: ['./users-liste.component.css']
})
export class UsersListeComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private router : Router) { }

  ngOnInit(): void {
    this.userService.getUsersApi();
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.userSubject.subscribe(
      (response: any[]) => {
        this.users = response;
        //console.log(this.users);
      }
    );
    this.userService.emitUserSubject();
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);

  }
  checksession(){
    Swal.fire(sessionStorage.getItem("user"))
  }

}
