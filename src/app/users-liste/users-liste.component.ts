import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-liste',
  templateUrl: './users-liste.component.html',
  styleUrls: ['./users-liste.component.css']
})
export class UsersListeComponent implements OnInit {

  users: User[];
  usersSubscription: Subscription;

  isLoadingUsers = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (reponse) => {  this.users = reponse;
                      this.isLoadingUsers = false;
                      console.log(this.users);
                    },
      (error) => { //this.isLoadingUsers = true;
                  });;
  }
}
