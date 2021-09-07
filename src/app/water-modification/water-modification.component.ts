import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WellBeing } from '../models/WellBeing.model';
import { UserWaterService } from '../services/user-water.service';

@Component({
  selector: 'app-water-modification',
  templateUrl: './water-modification.component.html',
  styleUrls: ['./water-modification.component.css']
})
export class WaterModificationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userWaterService: UserWaterService, private route: ActivatedRoute) { }

  wellBeings: WellBeing [];
  waterModifForm: FormGroup;
  wellBeing: WellBeing = {};
  resultatNecesary: Number;
  id: any;

  ngOnInit(): void {


    //On recupere le parametre :id qu'on a mis dans app-routing.module.ts
    this.id = this.route.snapshot.params['id'];
    this.userWaterService.getUsersWatersApi().subscribe(response => {
      this.wellBeings = response;
      console.log('Tableau = ' + this.wellBeings);
      // Appel function pour récupérer le
      this.getWaterById();
      this.initForm();
    });

   }

   //Partie formulaire//
  initForm(){
    this.waterModifForm = this.formBuilder.group({
      userWater: ['',Validators.required]
    })
  }

  onSubmitForm(){
    //formValue recupere les informations du formulaire grace a userForm qui est un object de type FormGroup
      const formValue = this.waterModifForm.value;
      //On créé l'instance User qu'on va ensuite ajouter a notre liste
      const modifWater = new WellBeing(this.id,0,
        //ici on ajouter les valeurs du formluaire dans notre formValue (a noter que l'id dans le formulaire est utilisé ici entre crochet)
        //Id = ['']
        formValue['userWater'],0,0,0,0,null,sessionStorage.getItem("user")
      );
     // this.userWaterService.modifWater(modifWater);
      this.userWaterService.modifWater(modifWater,this.id);
  }
     //Partie formulaire//


  getUserWater() {
    this.userWaterService.wellBeingWaterSubject.subscribe(
      (response: any[]) => {
        this.wellBeings = response;
        //console.log(this.users);
      }
    );
    this.userWaterService.emitUserWaterSubject();
  }

  getWaterById() {
    this.wellBeing = this.wellBeings.find(x => x.id_well_being == this.id);
    //console.log('Well being actuel : ' + this.wellBeing);
  }
}
