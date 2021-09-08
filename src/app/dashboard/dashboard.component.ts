import {MensurationService} from '../services/mensuration.service';
import {DatePipe} from '@angular/common';
import {Component,  OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  username: string;
  booleanWeight:boolean;
  booleanWater:boolean;
  booleanSleep:boolean;
  date =   this.datepipe.transform(new Date(), 'yyyy-MM-dd');


  constructor(private mensurationService: MensurationService, public datepipe: DatePipe) {
    this.username = sessionStorage.getItem('user');
  }


  ngOnInit(): void {
    if (localStorage.getItem('reload') !== 'true') {
      window.location.reload();
      localStorage.setItem('reload', 'true');
    }
    this.boolWeight();
    this.boolWater();
    this.boolSleep();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('reload');
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
