import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;
  username: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('user');
    this.userService.isAdmin(this.username).then(r => this.isAdmin());
  }

  isAdmin(): boolean {
    this.userService.userSubject.subscribe(
      (response: any[]) => {
        this.user = response[0];
      }
    );
    this.userService.emitUserSubject();
    return this.user.isAdmin;
  }

  deconnexion(): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      showCancelButton: true,
      confirmButtonText: 'Déconexion',
    }).then((result) => {
      if (result.value) {
        sessionStorage.removeItem('user');
        Swal.fire({
          title: 'Vous avez été déconnecté.',
          icon: 'success'
        }).then(() => {
          window.location.reload();
        });
      }
    });
  }
}
