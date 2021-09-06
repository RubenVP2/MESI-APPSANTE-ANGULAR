import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewExercice } from '../models/NewExercice.model';
import { NewSportsprogram } from '../models/NewSportsprogram.model';
import { ProgrammessportifsService } from '../services/programmessportifs.service';

@Component({
  selector: 'app-programmesportifsdetails',
  templateUrl: './programmesportifsdetails.component.html',
  styleUrls: ['./programmesportifsdetails.component.css']
})
export class ProgrammesportifsdetailsComponent implements OnInit {

  sportsprogram: NewSportsprogram[];
  exercices : NewExercice[];
  url = '';
  id = [];
  
  constructor(private sportsprogramService: ProgrammessportifsService, private router : Router) { }

  ngOnInit(): void {
    this.url = this.router.url.toString();
    this.id = this.url.split('/', 3);
    this.sportsprogramService.getSportsProgramsById(this.id[2]);
    this.getSportsProgram();
  }

  getSportsProgram() {
    this.sportsprogramService.sportsprogramSubject.subscribe(
      (response: any[]) => {
        this.sportsprogram = response;
      }
    );
    this.sportsprogramService.exerciceSubject.subscribe(
      (response: any[]) => {
        this.exercices = response;
      }
    );
    this.sportsprogramService.emitSportsProgramSubject();
    this.sportsprogramService.emitExerciceSubject();
  }

}
