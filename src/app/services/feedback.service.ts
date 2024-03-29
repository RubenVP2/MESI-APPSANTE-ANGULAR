import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Subject } from 'rxjs';
import { NewFeedback } from '../models/NewFeedback.model';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  feedbackSubject = new Subject<any[]>();

  constructor(private _location: Location,private http: HttpClient,private router : Router) { }

  private feedbacks: NewFeedback[] = [];

  private urlApi = "http://localhost:5000";

  emitFeedbackSubject() {
    this.feedbackSubject.next(this.feedbacks.slice());
  }

  getBack() {
    this._location.back();
  }

  // Récupére tout les feedbacks
  getFeedbacks() {
    // Requete http pour récupéreer les utilisateurs
    // return this.http.get<any[]>(this.urlApi + '/test/user/all');
    this.http.get<any[]>(this.urlApi + '/feedbacks').subscribe(
      (response) => {
        //users etant le nom de {} dans l'url de l'api
        this.feedbacks = response['feedbacks'];
        //console.log(this.users[0]);
        this.emitFeedbackSubject();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Récupére tout les feedbacks
  getFeedbackById(id : string) {
    // Requete http pour récupéreer les utilisateurs
    // return this.http.get<any[]>(this.urlApi + '/test/user/all');
    this.http.get<any[]>(this.urlApi + `/feedbacksdetails/${id}`).subscribe(
      (response) => {
        //users etant le nom de {} dans l'url de l'api
        var message = response['message'];
        if (message == "Ce feedback n'existe pas") {
          Swal.fire({
            text: message,
            icon : "error",
          });
          this.router.navigate(['/feedbacksadmin']);
        } else {
          this.feedbacks = response['feedbacks'];
          //console.log(this.users[0]);
          this.emitFeedbackSubject();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addFeedback(feedback: NewFeedback) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(feedback);
    console.log(body);
    this.http.post<any>(this.urlApi + "/feedbacksdetails/add", body, {'headers':headers}).subscribe((response) => {
        var message = response['message'];
        if (message == "Feedback envoyé"){
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
    },(error) => {
      console.log(error);
    });
  }

  deleteFeedback(id : string, pUsername: string) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({ username: pUsername, idFeedback: id });
    console.log(body);
    this.http.post<any>(this.urlApi + `/feedbacksdetails/delete`, body, {'headers' : headers}).subscribe((response) => {
      var message = response['message'];
      if (message == "Action réussie"){
        console.log(message);
        Swal.fire({
          text: message,
          icon : "success",
        });
        this.router.navigate(['/feedbacksadmin']);
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

  updateFeedback(id: string, pUsername: string, pState: string) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({ username: pUsername, idFeedback: id, state: pState});
    console.log(pState);
    console.log(body);
    this.http.post<any>(this.urlApi + `/feedbacksdetails/update`, body, {'headers' : headers}).subscribe((response) => {
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
}
