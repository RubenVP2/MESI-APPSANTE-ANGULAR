import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserWaterService} from '../services/user-water.service';
import {ActivatedRoute} from '@angular/router';
import {MensurationService} from '../services/mensuration.service';
import {WellBeing} from '../models/WellBeing.model';

@Component({
  selector: 'app-weight-modification',
  templateUrl: './weight-modification.component.html',
  styleUrls: ['./weight-modification.component.css']
})
export class WeightModificationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private mensurationService: MensurationService, private route: ActivatedRoute) { }

  wellBeings: WellBeing [];
  weightModifForm: FormGroup;
  wellBeing: WellBeing = {};

  id: any;
  ngOnInit(): void {
    //On recupere le parametre :id qu'on a mis dans app-routing.module.ts
    this.id = this.route.snapshot.params['id'];
    this.mensurationService.getUsersWeightsApi().subscribe(response => {
      this.wellBeings = response;
      console.log('Tableau = ' + this.wellBeings);
      // Appel function pour récupérer le
      this.getWeightById();
      this.initForm();
    });
  }

  //Partie formulaire//
  initForm(){
    this.weightModifForm = this.formBuilder.group({
      userWeight: ['',Validators.required]
    });
  }

  onSubmitForm(){
    //formValue recupere les informations du formulaire grace a userForm qui est un object de type FormGroup
    const formValue = this.weightModifForm.value;
    //On créé l'instance User qu'on va ensuite ajouter a notre liste
    const modifWater = new WellBeing(this.id,0,
      //ici on ajouter les valeurs du formluaire dans notre formValue (a noter que l'id dans le formulaire est utilisé ici entre crochet)
      //Id = ['']
      0,0,0,formValue['userWeight'],0,null,sessionStorage.getItem("user")
    );
    // this.userWaterService.modifWater(modifWater);
    this.mensurationService.modifWeight(modifWater,this.id);
  }

  getWeightById() {
    this.wellBeing = this.wellBeings.find(x => x.id_well_being == this.id);
    //console.log('Well being actuel : ' + this.wellBeing);
  }
}
