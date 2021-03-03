import { Component, OnInit } from '@angular/core';
import { NewUser } from '../models/NewUser.model';
import { FormArray, FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router : Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    //on créé notre formulaire au lancement de la page les variables doivent correspondres aux id du html
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],//pour rendre ce champs obligatoire on met ça dans un array et on le rend required avec Validator!
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // ici on fait une array comme avant sauf que comme on veux mettre plusieurs validators on fait une liste!
      age: ['', Validators.required],
      sexe: ['', Validators.required],
    });
  }

  onSubmitForm(form : NgForm) {
    //formValue recupere les informations du formulaire grace a userForm qui est un object de type FormGroup
    const formValue = form.value;
    //On créé l'instance User qu'on va ensuite ajouter a notre liste
    const newUser = new NewUser(
      formValue['username'],
      formValue['password'],
      formValue['email'],
      formValue['sexe'],
      formValue['age'],
    );
    this.userService.addUser(newUser);
    this.router.navigate(['/login'])
  }

}
