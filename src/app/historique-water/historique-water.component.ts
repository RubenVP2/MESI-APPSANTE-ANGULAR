import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { WellBeing } from '../models/WellBeing.model';
import { UserWaterService } from '../services/user-water.service';

@Component({
  selector: 'app-historique-water',
  templateUrl: './historique-water.component.html',
  styleUrls: ['./historique-water.component.css']
})
export class HistoriqueWaterComponent implements OnInit {


  constructor(private userWaterService : UserWaterService) { }

  wellBeings :WellBeing[];
  wellBeing: WellBeing = new WellBeing();
  result:Number;
  stringResult: String;
  resultatF =0;


  ngOnInit(): void {
    this.userWaterService.getUsersWatersApi().subscribe(response => {
      this.wellBeings = response;
      console.log('Tableau = ' + this.wellBeings);
      // Appel function pour récupérer le
    });


  }


    getUserWater() {
      this.userWaterService.wellBeingWaterSubject.subscribe(
        (response: any[]) => {
          this.wellBeings = response;
          //console.log(this.users);
        }
      );
      this.userWaterService.emitUserWaterSubject();
    }

    //On calcul le taux d'eau néceissaire pour une personne suivant son poids au jour Date calculé a l'aide du poids
  getTotalNecessary(id: number){
    //On recupere le poids de la personne sur l'id envoyé en param a l'aide de la méthode getColor(id :number)
    this.resultatF = ((this.wellBeings[id].weight-20)*15+1500)/1000;
    this.resultatF =  Math.round(this.resultatF * 10) / 10
    return this.resultatF;
  }

    getColor(id :number){
      //Appelle de la méthode getTotalNecessary(id) avec l'id de la liste (le 'i' dans le html) en param
        this.result = this.getTotalNecessary(id);
        if(this.wellBeings[id].water >= this.result){
          //console.log('true' + this.result);

          return 'green';

        }else if(this.wellBeings[id].water < this.result){
          //console.log('false' + this.result);

          return 'red';
        }
    }

}
