import {Injectable} from '@angular/core';
import {WellBeing} from '../models/WellBeing.model';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {map} from 'rxjs/operators';
import {WellBeingWaterFilter} from '../models/WellBeingWaterFilter.model';


@Injectable({
  providedIn: 'root'
})
export class MensurationService{

  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }


  boolean: boolean;
  private urlApi = "http://localhost:5000";


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

  // Recupère les informations de la tables WELL_BEING (water date poids)
  getUsersWeightsApi() {
    return this.http.get(this.urlApi + '/user/weight/' + sessionStorage.getItem("user")).pipe(map((res: any) => res['userWeight']));
  }

  //Ajout dans la table wellBeing
  addWeight(wellBeing: WellBeing) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(wellBeing);
    console.log("lala");
    this.http.post<any>(this.urlApi + "/addWeight", body, {'headers':headers}).subscribe((response) => {
      var message = response['message'];
      if (message == "Insertion réussie"){
        Swal.fire(message);
        this.router.navigate(['/historiqueWeight']);
      }
      else if(message== "Insertion réussie pour ce jour"){
        Swal.fire(message);
        this.router.navigate(['/historiqueWeight']);
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

  modifWeight(wellBeing :WellBeing , idWellBeing: any){
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(wellBeing);
    this.http.post<any>(this.urlApi + "/updateWeight/" + idWellBeing , body, {'headers':headers}).subscribe((response) => {
      var message = response['message'];
      if (message == "Update réussie"){
        Swal.fire({
          title: 'Voulez-vous sauvegarder vos modification ?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Sauvegarder',
          denyButtonText: `Ne pas sauvegarder`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire(message);
            this.router.navigate(['/historiqueWeight']);
          } else if (result.isDenied) {
            Swal.fire('Modification annulé', '', 'info');
          }
        });
      }
      else {
        Swal.fire(message);
      }
    },(error) => {
      console.log(error);
    });
  }
  // Recupère les informations de la tables WELL_BEING (water date poids) en fonction du filtre - Date Debut / Date Fin
  getUsersWeightFilterApi(wellBeingWaterFilter: WellBeingWaterFilter) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(wellBeingWaterFilter);
    return this.http.post<any>(this.urlApi + '/user/weight/' + sessionStorage.getItem("user")+ '/filter', body, {'headers':headers}).pipe(map((res: any) => {
      var message = res['message'];
      if (message == "Filtrage réussie"){
        Swal.fire(message, 'success');
        return res['userWeight'];
      }
      else {
        Swal.fire(message, 'error');
      }
    },(error) => {
      console.log(error);
    }));
  }

}
