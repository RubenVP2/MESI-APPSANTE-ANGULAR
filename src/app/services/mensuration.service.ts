import {Injectable} from '@angular/core';
import {WellBeing} from '../models/WellBeing.model';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MensurationService{

  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }


  boolean: boolean;
  private urlApi = "http://localhost:5000";

  addMensuration(wellBeing: WellBeing) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(wellBeing);
    this.http.post<any>(this.urlApi + "/addMensuration", body, {'headers':headers}).subscribe((response) => {
      var message = response['message'];
      if (message == "Vous avez inséré vos mensuration pour la journée " + wellBeing.date + " !"){
        Swal.fire(message);
        this.router.navigate(['/dashboard']);
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message
        });
      }
    }, (error) => {
      console.log(error);
    });
  }


  //Ajout dans la table wellBeing
  weightOfTheDay(date: String) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(date);
    return this.http.post<any>(this.urlApi + '/user/weight/today/' + sessionStorage.getItem("user"), body, {'headers':headers}).pipe(map((res: any) => {
      return res['exist'];
    }, (error) => {
      console.log(error);
    }));
  }

  //Ajout dans la table wellBeing
  waterOfTheDay(date: String) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(date);
    return this.http.post<any>(this.urlApi + '/user/water/today/' + sessionStorage.getItem("user"), body, {'headers':headers}).pipe(map((res: any) => {
      console.log("hello" + res['exist']);
      return res['exist'];
    }, (error) => {
      console.log(error);
    }));
  }

  //Ajout dans la table wellBeing
  sleepOfTheDay(date: String) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(date);
    return this.http.post<any>(this.urlApi + '/user/sleep/today/' + sessionStorage.getItem("user"), body, {'headers':headers}).pipe(map((res: any) => {
      return res['exist'];
    }, (error) => {
      console.log(error);
    }));
  }

}
