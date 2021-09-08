import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;
  username: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('user');
    this.userService.isAdmin(this.username).then(r => this.isAdmin());
  }

  isAdmin(): boolean{
    this.userService.userSubject.subscribe(
      (response: any[]) => {
        this.user = response[0];
      }
    );
    this.userService.emitUserSubject();
    return this.user.isAdmin;
  }
}
