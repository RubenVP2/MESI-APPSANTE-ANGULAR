import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: string;

  constructor() {
    this.username = sessionStorage.getItem('user');
  }
  users: User[];
  username: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("user");
    this.userService.isAdmin(this.username);
    this.isAdmin();
  }

  isAdmin() : boolean{
    this.userService.userSubject.subscribe(
      (response: any[]) => {
        this.users = response;
        //console.log(this.users);
      }
    );
    this.userService.emitUserSubject();
    return this.users[0].isAdmin;
  }
}
