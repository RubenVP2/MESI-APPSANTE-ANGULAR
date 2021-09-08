import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {LogUser} from '../models/LogUser.model';
import {UserService} from '../services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  username: string;
  changePassword: boolean;

  profilForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.username = sessionStorage.getItem('user');
    this.changePassword = false;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.profilForm = this.formBuilder.group({
      username: [this.username, Validators.required],
      password: [''],
      confirmPassword: ['']
    });
  }

  onSubmitForm() {
    const formValue = this.profilForm.value;
    if ( formValue.password !== '' && formValue.password !== formValue.confirmPassword ) {
      Swal.fire(
        'Erreur',
        'Mots de passe différents',
        'info'
      );
    } else {
      let user;
      user = new LogUser(
        formValue.username,
        formValue.password,
      );
      this.userService.updateProfil(this.username, user).then(_ =>  {
        Swal.fire(
          'Succès',
          'Les informations ont été mise à jour.',
          'success'
        ).then( () => window.location.reload() );
      });
    }
  }
}
