import {Component, OnInit} from '@angular/core';
import { WellBeing } from '../models/WellBeing.model';
import { UserWaterService } from '../services/user-water.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WellBeingWaterFilter} from '../models/WellBeingWaterFilter.model';



@Component({
  selector: 'app-historique-water',
  templateUrl: './historique-water.component.html',
  styleUrls: ['./historique-water.component.css']
})
export class HistoriqueWaterComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private userWaterService: UserWaterService) { }
  wellBeings: WellBeing[];
  result: Number;
  resultatF = 0;
  filterHistoriqueWater: FormGroup;



  ngOnInit(): void {
    this.userWaterService.getUsersWatersApi().subscribe(response => {
      this.wellBeings = response;
      console.log('Tableau = ' + this.wellBeings);
      // Appel function pour récupérer le
    });
    this.initForm();
    this.createChartsData();
  }

    //On calcul le taux d'eau néceissaire pour une personne suivant son poids au jour Date calculé a l'aide du poids
  getTotalNecessary(id: number){
    //On recupere le poids de la personne sur l'id envoyé en param a l'aide de la méthode getColor(id :number)
    this.resultatF = ((this.wellBeings[id].weight - 20) * 15 + 1500) / 1000;
    this.resultatF =  Math.round(this.resultatF * 10) / 10;
    return this.resultatF;
  }

    getColor(id :number){
      //Appelle de la méthode getTotalNecessary(id) avec l'id de la liste (le 'i' dans le html) en param
        this.result = this.getTotalNecessary(id);
        if(this.wellBeings[id].water >= this.result){
          return '#458FF4';

        }else if(this.wellBeings[id].water < this.result){
          return 'red';
        }
    }

  initForm(){
    this.filterHistoriqueWater = this.formBuilder.group({
      calendarStartFilter: ['', Validators.required],
      calendarEndFilter: ['', Validators.required]

    });
  }

  onSubmitForm(){
    //formValue recupere les informations du formulaire grace a userForm qui est un object de type FormGroup
    const formValue = this.filterHistoriqueWater.value;
    //On créé l'instance User qu'on va ensuite ajouter a notre liste
    const wellBeingWaterFilter = new WellBeingWaterFilter(
      formValue['calendarStartFilter'],
      formValue['calendarEndFilter']
    );
    this.userWaterService.getUsersWatersFilterApi(wellBeingWaterFilter).subscribe(response => {
      this.wellBeings = response;
    });
  }

  reset() {
    window.location.reload();
  }

}
