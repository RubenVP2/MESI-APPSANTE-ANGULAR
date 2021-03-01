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
  result:Number;
  stringResult: String;


  ngOnInit(): void {
    this.userWaterService.getUsersWatersApi();
    this.getUserWater();
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

    getColor(id :number){
      //Appelle de la méthode getTotalNecessary(id) avec l'id de la liste (le 'i' dans le html) en param
        this.result = this.userWaterService.getTotalNecessary(id);
        if(this.wellBeings[id].water >= this.result){
          //console.log('true' + this.result);

          return 'green';

        }else if(this.wellBeings[id].water < this.result){
          //console.log('false' + this.result);

          return 'red';
        }
    }

}
