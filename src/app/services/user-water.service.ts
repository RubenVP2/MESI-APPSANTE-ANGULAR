import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { WellBeing } from "../models/WellBeing.model";
import { UserService } from "./user.service";
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from "@angular/router";
import {WellBeingWaterFilter} from '../models/WellBeingWaterFilter.model';



@Injectable({
  providedIn: 'root'
})
export class UserWaterService{

    wellBeingWaterSubject = new Subject<any[]>();

    constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

    private wellBeings: WellBeing[] = [];

    idSession = 1;

    resultatF =0;
    resultatById=0;

    private urlApi = "http://localhost:5000";

    emitUserWaterSubject() {
      this.wellBeingWaterSubject.next(this.wellBeings.slice());
    }

    // Recupère les informations de la tables WELL_BEING (water date poids)
  getUsersWatersApi() {
      return this.http.get(this.urlApi + '/user/water/' + sessionStorage.getItem("user")).pipe(map((res: any) => res['userWater']));
    }

    addWater(wellBeing: WellBeing) {
      const headers = { 'content-type': 'application/json'};
      const body = JSON.stringify(wellBeing);
      this.http.post<any>(this.urlApi + "/addWater", body, {'headers':headers}).subscribe((response) => {
          var message = response['message'];
          if (message == "Insertion réussie"){
            Swal.fire(message);
            this.router.navigate(['/historiqueWater']);
          }
          else {
            Swal.fire(message);
          }
       },(error) => {
         console.log(error);
       });
    }

  modifWater(wellBeing :WellBeing , idWellBeing: any){
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(wellBeing);
    this.http.post<any>(this.urlApi + "/updateWater/" + idWellBeing , body, {'headers':headers}).subscribe((response) => {
        var message = response['message'];
        if (message == "Update réussie"){
          Swal.fire(message);
          this.router.navigate(['/historiqueWater']);
        }
        else {
          Swal.fire(message);
        }
     },(error) => {
       console.log(error);
     });
  }

  getUsersWatersFilterApi(wellBeingWaterFilter: WellBeingWaterFilter) {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(wellBeingWaterFilter);
    return this.http.post<any>(this.urlApi + '/user/water/' + sessionStorage.getItem("user")+ '/filter', body, {'headers':headers}).pipe(map((res: any) => {
      var message = res['message'];
      if (message == "Filtrage réussie"){
        Swal.fire(message, 'success');
        return res['userWater'];
      }
      else {
        Swal.fire(message, 'error');
      }
    },(error) => {
      console.log(error);

    }));
  }

}
