import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WellBeing} from '../models/WellBeing.model';
import {MensurationService} from '../services/mensuration.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-form-mensuration-weight',
  templateUrl: './form-mensuration-weight.component.html',
  styleUrls: ['./form-mensuration-weight.component.css']
})
export class FormMensurationWeightComponent implements OnInit {

  mensurationForm: FormGroup;
  weight: number;
  today = new Date().toJSON().split('T')[0];


  constructor(private formBuilder: FormBuilder, private mensurationService: MensurationService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.mensurationForm = this.formBuilder.group({
      date: ['', Validators.required],
      weight: ['', Validators.required],
    });
  }

  onSubmitForm(){
    //formValue recupere les informations du formulaire grace a userForm qui est un object de type FormGroup
    const formValue = this.mensurationForm.value;
    //On créé l'instance User qu'on va ensuite ajouter a notre liste
    const addMensuration = new WellBeing(0, 0,
      0, 0, 0, formValue['weight'], 0,
      formValue['date'], sessionStorage.getItem("user")
    );
    this.mensurationService.addWeight(addMensuration);
  }
}
