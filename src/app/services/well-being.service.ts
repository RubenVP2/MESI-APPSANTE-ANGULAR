import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class WellBeingService {

  wellBeing: any[];

  constructor(private http: HttpClient,private router : Router) { }

  private urlApi = "http://localhost:5000";

  getWellBeing(user : string){
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({ username: user});
    this.http.post<any[]>(this.urlApi + '/weightAndSleep', body, {'headers' : headers}).subscribe(
      (response) => {
        this.wellBeing = response;
        this.router.navigate(['/weightAndSleep']);
      },
      (error) => {
        console.log(error);
      }
    );
}

insertWeight(user : string, wght : number ){
  const headers = { 'content-type': 'application/json'};
  const body = JSON.stringify({ username: user, weight: wght});
  this.http.post<any[]>(this.urlApi + '/weightAndSleep/addWeight', body, {'headers' : headers}).subscribe(
    (response) => {
      Swal.fire(response['message']);
      this.router.navigate(['/weightAndSleep']);
    },
    (error) => {
      console.log(error);
    }
  );
}

insertSleep(user : string, slp : number ){
  const headers = { 'content-type': 'application/json'};
  const body = JSON.stringify({ username: user, sleep: slp});
  this.http.post<any[]>(this.urlApi + '/weightAndSleep/addWeight', body, {'headers' : headers}).subscribe(
    (response) => {
      Swal.fire(response['message']);
      this.router.navigate(['/weightAndSleep']);
    },
    (error) => {
      console.log(error);
    }
  );
}


}
