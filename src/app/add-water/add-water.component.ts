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

  wellBeings :WellBeing[];
  wellBeing: WellBeing = new WellBeing();

  constructor(private formBuilder: FormBuilder, private userWaterService: UserWaterService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.userWaterService.getUsersWatersApi().subscribe(response => {
      this.wellBeings = response;
     // console.log('Tableau = ' + this.wellBeings);
      this.initForm();
      //Appel function pour récupérer le
    });

  }


  initForm(){
    this.waterAddForm = this.formBuilder.group({
      userWater: ['',Validators.required],
      userDate: ['',Validators.required]
    })
  }


  addWater(wellBeing :WellBeing){
    const wellBeingObject = new WellBeing();
    wellBeingObject.water = wellBeing.water;
    wellBeingObject.date = wellBeing.date;
    wellBeingObject.id_well_being = wellBeing.id_well_being;

    this.wellBeings.push(wellBeingObject);
  }


  onSubmitForm(){
    //formValue recupere les informations du formulaire grace a userForm qui est un object de type FormGroup
      const formValue = this.waterAddForm.value;
      //On créé l'instance User qu'on va ensuite ajouter a notre liste
       const addWater = new WellBeing(0,0,
        formValue['userWater'],0,0,0,
        formValue['userDate']
      );
     // this.addWater(addWater);
      this.router.navigate(['/historiqueWater']);
  }
     //Partie formulaire//

}
