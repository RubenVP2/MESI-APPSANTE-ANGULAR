import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Subject } from 'rxjs';
import { NewSportsprogram } from '../models/NewSportsprogram.model';
import { NewExercice } from '../models/NewExercice.model';

@Injectable({
  providedIn: 'root'
})
export class ProgrammessportifsService {

  sportsprogramSubject = new Subject<any[]>();
  exerciceSubject = new Subject<any[]>();

  constructor(private http: HttpClient,private router : Router) { }

  private sportsprogram: NewSportsprogram[] = [];
  private exercice : NewExercice[] = [];

  private urlApi = "http://localhost:5000";

  emitSportsProgramSubject() {
    this.sportsprogramSubject.next(this.sportsprogram.slice());
  }

  emitExerciceSubject() {
    this.exerciceSubject.next(this.exercice.slice());
  }

  // Récupére tout les sports programs
  getAllSportsPrograms() {
    // Requete http pour récupéreer les utilisateurs
    this.http.get<any[]>(this.urlApi + '/sportsprogram').subscribe(
      (response) => {
        //users etant le nom de {} dans l'url de l'api
        this.sportsprogram = response['sportsprogram'];
        this.emitSportsProgramSubject();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Récupére tout les sports programs d'un utilisateur
  getAllSportsProgramsOfUser(pUsername : string) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({ username: pUsername});
    console.log(body);
    this.http.post<any[]>(this.urlApi + '/sportsprogramofuser', body, {'headers' : headers}).subscribe(
      (response) => {
        var message = response['message'];
        if (message == "Cette utilisateur n'existe pas") {
          Swal.fire({
            text: message,
            icon : "error",
          });
          this.router.navigate(['/']);
        } else {
          this.sportsprogram = response['sportsprogram'];
          this.emitSportsProgramSubject();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Récupére une sports programs
  getSportsProgramsById(id : string) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({ id_sports_program: id });
    console.log(body);
    this.http.post<any[]>(this.urlApi + `/sportsprogramdetails`, body, {'headers' : headers}).subscribe(
      (response) => {
        //users etant le nom de {} dans l'url de l'api
        var message = response['message'];
        if (message == "Ce programme sportif n'existe pas") {
          Swal.fire({
            text: message,
            icon : "error",
          });
          this.router.navigate(['/feedbacksadmin']);
        } else {
          this.sportsprogram = response['sportsprogram'];
          this.exercice = response['exercice']
          //console.log(this.users[0]);
          this.emitSportsProgramSubject();
          this.emitExerciceSubject();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
