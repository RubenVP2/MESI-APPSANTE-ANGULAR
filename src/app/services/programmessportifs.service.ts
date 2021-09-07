import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { identity, Subject } from 'rxjs';
import { NewSportsprogram } from '../models/NewSportsprogram.model';
import { NewExercice } from '../models/NewExercice.model';
import { Result } from '../models/Result.model';

@Injectable({
  providedIn: 'root'
})
export class ProgrammessportifsService {

  sportsprogramSubject = new Subject<any[]>();
  exerciceSubject = new Subject<any[]>();
  resultSubject = new Subject<any[]>();

  constructor(private _location: Location, private http: HttpClient,private router : Router) { }

  private sportsprogram: NewSportsprogram[] = [];
  private exercices : NewExercice[] = [];
  private results : Result[] = [];

  private urlApi = "http://localhost:5000";

  getBack() {
    this._location.back();
  }

  emitSportsProgramSubject() {
    this.sportsprogramSubject.next(this.sportsprogram.slice());
  }

  emitExerciceSubject() {
    this.exerciceSubject.next(this.exercices.slice());
  }

  emitResultSubject() {
    this.resultSubject.next(this.results.slice());
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
          this.getBack();
        } else {
          this.sportsprogram = response['sportsprogram'];
          this.exercices = response['exercice']
          console.log(response['sportsprogram']);
          console.log(response['exercice']);
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

  // Supprimer un programme sportifs
  deleteSportsProgram(id : string, pUsername : string) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({ id_sports_program: id, username : pUsername });
    console.log(body);
    this.http.post<any>(this.urlApi + `/sportsprogramdetails/delete`, body, {'headers' : headers}).subscribe((response) => {
      var message = response['message'];
      if (message == "Suppresion réussie"){
        console.log(message);
        Swal.fire({
          text: message,
          icon : "success",
        });
        this.getBack();
      }
      else {
        Swal.fire({
          text: message,
          icon : "error",
        });
      }
    },(error) =>
    {
      console.log(error);
    });
  }

  // Modifier un programme sportifs
  updateSportsProgram(id :string, title: string, description: string, level: string) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({ title: title, description : description, level: level, id_sports_program: id});
    console.log(body);
    this.http.post<any>(this.urlApi + `/sportsprogramdetails/update`, body, {'headers' : headers}).subscribe((response) => {
      var message = response['message'];
      if (message == "Modification réussie"){
        console.log(message);
        Swal.fire({
          text: message,
          icon : "success",
        });
        this.getBack();
      }
      else {
        Swal.fire({
          text: message,
          icon : "error",
        });
      }
    },(error) =>
    {
      console.log(error);
    });
  }

  // Créer un programme sportifs
  createSportsProgram(pUsername :string, title: string, description: string, level: string) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({ title: title, description : description, level: level, creator: pUsername, username : pUsername });
    console.log(body);
    this.http.post<any>(this.urlApi + `/sportsprogramdetails/add`, body, {'headers' : headers}).subscribe((response) => {
      var message = response['message'];
      if (message == "Programme créer"){
        console.log(message);
        Swal.fire({
          text: message,
          icon : "success",
        });
        this.getBack();
      }
      else {
        Swal.fire({
          text: message,
          icon : "error",
        });
      }
    },(error) =>
    {
      console.log(error);
    });
  }

  // Récupére les 5 derniers resultats de l'utilisateur
  getResult(id_exercice: number, pUsername : string) {
    // Requete http pour récupéreer les utilisateurs
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({ id_exercice: id_exercice, username: pUsername });
    console.log(body);
    this.http.post<any[]>(this.urlApi + '/result', body, {'headers' : headers}).subscribe(
      (response) => {
        var message = response['message'];
        if (message == "Cet utilisateur n'a pas de resultats") {

        } else {
          this.results = response['results']
          console.log(response['results']);
          this.emitResultSubject();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Récupére les 5 derniers resultats de l'utilisateur
  addResult(id_exercice: number, pUsername : string, weight: number) {
    // Requete http pour récupéreer les utilisateurs
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({ id_exercice: id_exercice, username: pUsername, weight: weight});
    console.log(body);
    this.http.post<any[]>(this.urlApi + '/result/add', body, {'headers' : headers}).subscribe(
      (response) => {
        var message = response['message'];
        if (message == "Cet utilisateur n'existe pas") {

        } else {
          console.log(message);
          Swal.fire({
            text: message,
            icon : "success",
          })
          this.getResult(id_exercice, pUsername);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Recupère une exercice
  getExerciceById(id: string) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({ id_exercice: id });
    console.log(body);
    this.http.post<any[]>(this.urlApi + `/exercicesdetails`, body, {'headers' : headers}).subscribe(
      (response) => {
        var message = response['message'];
        if (message == "Cette exercice n'existe pas") {
          Swal.fire({
            text: message,
            icon : "error",
          });
          this.getBack();
        } else {
          this.exercices = response['exercice']
          console.log(response['exercice']);
          this.emitExerciceSubject();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Supprime un exercice
  deleteExercice(id : string, pUsername : string) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({ id_exercice: id, username : pUsername });
    console.log(body);
    this.http.post<any>(this.urlApi + `/exercice/delete`, body, {'headers' : headers}).subscribe((response) => {
      var message = response['message'];
      if (message == "Action réussie"){
        console.log(message);
        Swal.fire({
          text: message,
          icon : "success",
        });
        this.getBack();
      }
      else {
        Swal.fire({
          text: message,
          icon : "error",
        });
      }
    },(error) =>
    {
      console.log(error);
    });
  }

  // Update un exercice
  updateExercice(id : string, pUsername :string, nbReps : string, nbSeries : string,
    restExercice : string, restSeries : string) {
      const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({ username: pUsername, id_exercice: id, nbreps: nbReps, nbseries: nbSeries, restseries : restSeries, restexercice :restExercice });
    console.log(body);
    this.http.post<any>(this.urlApi + `/exercice/update`, body, {'headers' : headers}).subscribe((response) => {
      var message = response['message'];
      if (message == "Action réussie"){
        console.log(message);
        Swal.fire({
          text: message,
          icon : "success",
        });
      }
      else {
        Swal.fire({
          text: message,
          icon : "error",
        });
      }
    },(error) =>
    {
      console.log(error);
    });
  }

  // Créer un exercice
  createExercice(id : string, title: string, name: string, nbReps : string, nbSeries : string,
    restExercice : string, restSeries : string) {
      const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({ id_sports_program: id, title: title, imagehelp: "", nbreps: nbReps, nbseries: nbSeries, restseries : restSeries, restexercice :restExercice, muscle: name });
    console.log(body);
    this.http.post<any>(this.urlApi + `/exercices/add`, body, {'headers' : headers}).subscribe((response) => {
      var message = response['message'];
      console.log(message);
      if (message == "Exercice créer"){
        Swal.fire({
          text: message,
          icon : "success",
        });
        this.getBack();
      }
      else {
        Swal.fire({
          text: message,
          icon : "error",
        });
      }
    },(error) =>
    {
      console.log(error);
    });
  }
}
