import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { NewExercice } from '../models/NewExercice.model';
import { ProgrammessportifsService } from '../services/programmessportifs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createexercice',
  templateUrl: './createexercice.component.html',
  styleUrls: ['./createexercice.component.css']
})
export class CreateexerciceComponent implements OnInit {

  newExercice: NewExercice[];
  exerciceForm : FormGroup;
  url = '';
  id = [];
  username = '';
  constructor(private _location: Location, private formBuilder: FormBuilder, private programmessportifsService : ProgrammessportifsService, private router : Router) { }

  ngOnInit(): void {
    this.url = this.router.url.toString();
    this.id = this.url.split('/', 3);
    this.initForm();
  }


  getBack() {
    this._location.back();
  }

  initForm() {
    //on créé notre formulaire au lancement de la page les variables doivent correspondres aux id du html
    //public radioValue: string = this.oneFeedback[0].etat;
    this.exerciceForm = this.formBuilder.group({
      nomExercice: ['', Validators.required],
      nomMuscle: ['', Validators.required],
      nbReps: ['', Validators.required],
      nbSeries: ['', Validators.required],
      restExercice: ['', Validators.required],
      restSeries: ['', Validators.required],
    });
  }

  onSubmitForm(form : NgForm) {
    console.log('onSubmitForm');
    const formValue = form.value;
    this.username = sessionStorage.getItem("user");
    console.log(form.value);
    this.programmessportifsService.createExercice(this.id[2], formValue['nomExercice'], formValue['nomMuscle'],
      formValue['nbReps'], formValue['nbSeries'], formValue['restExercice'], formValue['restSeries']);
  }

}
