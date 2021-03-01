import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WellBeing } from '../models/WellBeing.model';
import { UserWaterService } from '../services/user-water.service';

@Component({
  selector: 'app-water-detail',
  templateUrl: './water-detail.component.html',
  styleUrls: ['./water-detail.component.css']
})
export class WaterDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,private userWaterService: UserWaterService ) {}
  wellBeings :WellBeing [];
  wellBeing :WellBeing = {};



  ngOnInit(): void {
    this.userWaterService.getUsersWatersApi();
    this.getUserWater();
    //On recupere le parametre :id qu'on a mis dans app-routing.module.ts
    const id = this.route.snapshot.params['id'];
    this.getWaterById(id);
    // this.wellBeing.water = this.userWaterService.getWaterById(+id);
    console.log(id);
    //this.getWaterById(id);

    //this.wellBeing.weight = this.userWaterService.getweightById(+id)
  }


  getWaterById(id :number){
    this.wellBeing.water = this.userWaterService.getWaterById(+id);
    return this.wellBeing.water;
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
