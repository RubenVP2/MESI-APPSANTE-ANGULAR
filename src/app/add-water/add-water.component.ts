import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WellBeing } from '../models/WellBeing.model';
import { UserWaterService } from '../services/user-water.service';


@Component({
  selector: 'app-add-water',
  templateUrl: './add-water.component.html',
  styleUrls: ['./add-water.component.css']
})
export class AddWaterComponent implements OnInit {

  waterAddForm: FormGroup;

  wellBeings: WellBeing[];
  today = new Date().toJSON().split('T')[0];

  constructor(private formBuilder: FormBuilder, private userWaterService: UserWaterService) { }

  ngOnInit(): void {
    this.userWaterService.getUsersWatersApi().subscribe(response => {
      this.wellBeings = response;
      this.initForm();
    });

  }


  initForm(){
    this.waterAddForm = this.formBuilder.group({
      userWater: ['', Validators.required],
      userDate: ['', Validators.required]
    });
  }

  onSubmitForm(){
      //formValue recupere les informations du formulaire grace a userForm qui est un object de type FormGroup
        const formValue = this.waterAddForm.value;
        //On créé l'instance User qu'on va ensuite ajouter a notre liste
         const addWater = new WellBeing(0, 0,
          formValue['userWater'], 0, 0, 0, 0,
          formValue['userDate'], sessionStorage.getItem("user")
        );
        this.userWaterService.addWater(addWater);
    }
  }
