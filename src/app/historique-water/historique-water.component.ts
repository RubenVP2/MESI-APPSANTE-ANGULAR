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
      //On récupere les infos des deux filtres calender
      calendarStartFilter: ['', Validators.required],
      calendarEndFilter: ['', Validators.required]
    });
  }

  onSubmitForm(){
    //formValue recupere les informations du formulaire
    const formValue = this.filterHistoriqueWater.value;
    //On créé l'instance wellBeingWaterFilter qui permettra de retourner notre nouvelle liste
    const wellBeingWaterFilter = new WellBeingWaterFilter(
      formValue['calendarStartFilter'],
      formValue['calendarEndFilter']
    );
    //Appel de la méthode POST pour recueprer la liste de résultat en fonction du filtre
    this.userWaterService.getUsersWatersFilterApi(wellBeingWaterFilter).subscribe(response => {
      this.wellBeings = response;
    });
  }

  //On reset les filtres
  reset() {
    window.location.reload();
  }

}
