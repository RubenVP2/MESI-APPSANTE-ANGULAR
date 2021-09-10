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

  user?: User = new User();

  username: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('user');
    this.userService.isAdmin(this.username).then((res) => this.user.isAdmin = res.role[0].isAdmin);
  }



  deconnexion(): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      showCancelButton: true,
      confirmButtonText: 'Déconnexion',
    }).then((result) => {
      if (result.value) {
        sessionStorage.removeItem('user');
        localStorage.removeItem('reload');
        Swal.fire({
          title: 'Vous avez été déconnecté.',
          icon: 'success'
        }).then(() => {
          window.location.reload();
        });
      }
    });
  }

  isAdmin(): boolean {
    return this.user.isAdmin;
  }
}
