import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WellBeing } from '../models/WellBeing.model';
import { UserWaterService } from '../services/user-water.service';

@Component({
  selector: 'app-water-detail',
  templateUrl: './water-detail.component.html',
  styleUrls: ['./water-detail.component.css']
})
export class WaterDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userWaterService: UserWaterService) {


  }
  wellBeings;
  wellBeing: WellBeing = new WellBeing();
  id: any;



  ngOnInit(): void {
    // Récupération id de l'url
    this.id = this.route.snapshot.params['id'];
    // subscribe à l'appel de l'api et copie le tableau t'as capté
    this.userWaterService.getTest().subscribe(response => {
      this.wellBeings = response;
      console.log('Tableau = ' + this.wellBeings);
      // Appel function pour récupérer le
      this.getWaterById();
    });
  }


  getWaterById() {
    this.wellBeing = this.wellBeings.find(x => x.id_well_being == this.id);
    console.log('Well being actuel : ' + this.wellBeing);
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



}
