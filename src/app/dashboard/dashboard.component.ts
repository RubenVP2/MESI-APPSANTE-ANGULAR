import { Component, OnInit } from '@angular/core';
import {MensurationService} from '../services/mensuration.service';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: string;
  booleanWeight:boolean;
  booleanWater:boolean;
  booleanSleep:boolean;
  date =   this.datepipe.transform(new Date(), 'yyyy-MM-dd');



  constructor(private mensurationService: MensurationService, public datepipe: DatePipe) { this.username = sessionStorage.getItem('user'); }

  ngOnInit(): void {
    this.boolWeight();
    this.boolWater();
    this.boolSleep();
  }

  boolWeight(){
    this.mensurationService.weightOfTheDay(this.date).subscribe(response => {
      this.booleanWeight = response;
    });
  }

  boolWater(){
    this.mensurationService.waterOfTheDay(this.date).subscribe(response => {
      this.booleanWater = response;
    });
  }

  boolSleep(){
    this.mensurationService.sleepOfTheDay(this.date).subscribe(response => {
      this.booleanSleep = response;
    });
  }



}
