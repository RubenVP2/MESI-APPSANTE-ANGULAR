import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { NewSportsprogram } from '../models/NewSportsprogram.model';
import { ProgrammessportifsService } from '../services/programmessportifs.service';

@Component({
  selector: 'app-createprogrammesportifs',
  templateUrl: './createprogrammesportifs.component.html',
  styleUrls: ['./createprogrammesportifs.component.css']
})
export class CreateprogrammesportifsComponent implements OnInit {

  newProgram: NewSportsprogram[];
  sportsprogramForm : FormGroup;
  url = '';
  id = [];
  username = '';
  constructor(private _location: Location, private formBuilder: FormBuilder, private programmessportifsService : ProgrammessportifsService, private router : Router) { }


  ngOnInit(): void {
    this.initForm();
  }


  getBack() {
    this._location.back();
  }

  initForm() {
    //on créé notre formulaire au lancement de la page les variables doivent correspondres aux id du html
    //public radioValue: string = this.oneFeedback[0].etat;
    this.sportsprogramForm = this.formBuilder.group({
      nomProgramme: ['', Validators.required],
      descriptionProgramme: ['', Validators.required],
      levelProgramme: ['', Validators.required],
    });
  }

  onSubmitForm(form : NgForm) {
    console.log('onSubmitForm');
    const formValue = form.value;
    this.username = sessionStorage.getItem("user");
    console.log(form.value);
    this.programmessportifsService.createSportsProgram(this.username, formValue['nomProgramme'], formValue['descriptionProgramme'], formValue['levelProgramme']);
  }

}
