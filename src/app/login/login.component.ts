import { Component, OnInit } from '@angular/core';
import { NewUser } from '../models/NewUser.model';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/User.model';
import { LogUser } from '../models/LogUser.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // Si l'user est déjà connecté on le redirige vers la page d'accueil
    if (sessionStorage.getItem("user") != null) {
      this.router.navigate(['/']);
    }
  }

  initForm() {
    //on créé notre formulaire au lancement de la page les variables doivent correspondres aux id du html
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],//pour rendre ce champs obligatoire on met ça dans un array et on le rend required avec Validator!
      password: ['', Validators.required],
    });
  }

  onSubmitForm(form: NgForm) {
    //formValue recupere les informations du formulaire grace a userForm qui est un object de type FormGroup
    const formValue = form.value;
    //On créé l'instance User qu'on va ensuite ajouter a notre liste
    const user = new LogUser(
      formValue['username'],
      formValue['password'],
    );
    this.userService.login(user);
    //sessionStorage.setItem("email", status['message'])
    //sessionStorage.clear();
  }

  register() {
    this.router.navigate(['/inscription']);
  }
}
