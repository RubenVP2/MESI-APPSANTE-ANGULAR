import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Subject } from 'rxjs';
import { Feedback } from '../models/Feedback.model';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  feedbackSubject = new Subject<any[]>();

  constructor(private http: HttpClient,private router : Router) { }

  private feedbacks: Feedback[] = [];

  private urlApi = "http://localhost:5000";

  emitFeedbackSubject() {
    this.feedbackSubject.next(this.feedbacks.slice());
  }

  // Récupére tout les feedbacks
  getFeedbacks() {
    // Requete http pour récupéreer les utilisateurs
    // return this.http.get<any[]>(this.urlApi + '/test/user/all');
    this.http.get<any[]>(this.urlApi + '/suggestionbugtracker').subscribe(
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
    this.http.get<any[]>(this.urlApi + `/suggestionbugtrackerdetails/${id}`).subscribe(
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

  addFeedback() {

  }

  deleteFeedback(id : string, username: string) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(username);
    this.http.post<any>(this.urlApi + `/suggestionbugtrackerdetails/${id}/delete`, body, {'headers' : headers}).subscribe((response) =>
    {
      var message = response['message'];
      if (message == "Suppresion réussie"){
        Swal.fire(message);
        // this.router.navigate(['/suggestionbugtrackeradmin']);
      }
      else {
        Swal.fire(message);
        //this.router.navigate(['../../suggestionbugtrackeradmin']);
      }
    },(error) =>
    {
      console.log(error);
    });
  }
}
