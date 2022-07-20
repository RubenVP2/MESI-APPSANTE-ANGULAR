import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  username= '';

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

  deleteProgram(){
    Swal.fire({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de supprimer ce programme ?',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
    }).then((result) => {
      if (result.value) {
        this.username = sessionStorage.getItem("user");
        this.sportsprogramService.deleteSportsProgram(this.id[2], this.username);
      }
    });
  }
}
