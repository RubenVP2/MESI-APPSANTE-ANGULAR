import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WellBeing } from '../models/WellBeing.model';
import { UserWaterService } from '../services/user-water.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-water-detail',
  templateUrl: './water-detail.component.html',
  styleUrls: ['./water-detail.component.css']
})
export class WaterDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userWaterService: UserWaterService, private _location: Location) {}
  wellBeings: WellBeing[];
  wellBeing: WellBeing = new WellBeing();
  id: any;



  ngOnInit(): void {

    //On recupere le parametre :id qu'on a mis dans app-routing.module.ts
    this.id = this.route.snapshot.params['id'];

    this.userWaterService.getUsersWatersApi().subscribe(response => {
      this.wellBeings = response;
      console.log('Tableau = ' + this.wellBeings);
      // Appel function pour récupérer le
      this.getWaterById();
    });
  }

  backClicked() {
    this._location.back();
  }

  getWaterById() {
    this.wellBeing = this.wellBeings.find(x => x.id_well_being == this.id);
    console.log(this.wellBeing);
  }



}
