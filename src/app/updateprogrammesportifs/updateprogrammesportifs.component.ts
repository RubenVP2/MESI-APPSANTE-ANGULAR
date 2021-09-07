import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { NewSportsprogram } from '../models/NewSportsprogram.model';
import { ProgrammessportifsService } from '../services/programmessportifs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateprogrammesportifs',
  templateUrl: './updateprogrammesportifs.component.html',
  styleUrls: ['./updateprogrammesportifs.component.css']
})
export class UpdateprogrammesportifsComponent implements OnInit {

  oneSportsProgram: NewSportsprogram[];
  sportsprogramForm : FormGroup;
  url = '';
  id = [];
  username = '';
  constructor(private _location: Location, private formBuilder: FormBuilder, private programmessportifsService : ProgrammessportifsService, private router : Router) { }

  ngOnInit(): void {
    this.url = this.router.url.toString();
    this.id = this.url.split('/', 3);
    this.programmessportifsService.getSportsProgramsById(this.id[2]);
    this.getSportsProgram();
    this.initForm();
  }

  getBack() {
    this._location.back();
  }

  getSportsProgram() {
    this.programmessportifsService.sportsprogramSubject.subscribe(
      (response: any[]) => {
        this.oneSportsProgram = response;
      }
    );
    this.programmessportifsService.emitSportsProgramSubject();
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
    this.programmessportifsService.updateSportsProgram(this.id[2], formValue['nomProgramme'], formValue['descriptionProgramme'], formValue['levelProgramme']);
  }

}
