import { Route } from '@angular/compiler/src/core';
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

  constructor(private formBuilder: FormBuilder, private userWaterService: UserWaterService, private route: ActivatedRoute, private router: Router) { }

  wellBeings :WellBeing [];
  waterModifForm: FormGroup;
  wellBeing :WellBeing={};
  resultatNecesary : Number;

  ngOnInit(): void {
    this.userWaterService.getUsersWatersApi();
    this.getUserWater();
    //On recupere le parametre :id qu'on a mis dans app-routing.module.ts
    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.initForm();
    this.getWaterById(id);
    this.getDateById(id);
    this.getTotalNecessaryById(id);
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
      const modifWater = new WellBeing(
        //ici on ajouter les valeurs du formluaire dans notre formValue (a noter que l'id dans le formulaire est utilisé ici entre crochet)
        //Id = ['']
        formValue['userWater'],
      );
      this.router.navigate(['/historiqueWater']);
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

  //Recupération des données de l'élément séléctionné//
  getWaterById(id :number){
    this.wellBeing.water = this.userWaterService.getWaterById(+id);
    return this.wellBeing.water;
  }

  getDateById(id :number){
    this.wellBeing.date = this.userWaterService.getDateById(+id);
    return this.wellBeing.date;
  }

  getTotalNecessaryById(id : number){
    this.resultatNecesary = this.userWaterService.getTotalNecessaryById(+id);
    return this.resultatNecesary;
  }
}
