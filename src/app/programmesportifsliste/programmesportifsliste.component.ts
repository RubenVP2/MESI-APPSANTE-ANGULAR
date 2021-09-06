import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewSportsprogram } from '../models/NewSportsprogram.model';
import { ProgrammessportifsService } from '../services/programmessportifs.service';

@Component({
  selector: 'app-programmesportifsliste',
  templateUrl: './programmesportifsliste.component.html',
  styleUrls: ['./programmesportifsliste.component.css']
})
export class ProgrammesportifslisteComponent implements OnInit {

  sportsprogram: NewSportsprogram[];

  constructor(private sportsprogramService: ProgrammessportifsService, private router : Router) { }

  ngOnInit(): void {
    this.sportsprogramService.getAllSportsProgramsOfUser(sessionStorage.getItem("user"));
    this.getSportsProgramsOfUser()
  }

  getSportsProgramsOfUser() {
    this.sportsprogramService.sportsprogramSubject.subscribe(
      (response: any[]) => {
        this.sportsprogram = response;
        //console.log(this.feedbacks);
      }
    );
    this.sportsprogramService.emitSportsProgramSubject();
  }

}
