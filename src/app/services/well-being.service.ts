import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WellBeingService {

  wellBeing: any[];

  constructor(private http: HttpClient,private router : Router) { }

  private urlApi = "http://localhost:5000";

insertSleep(user : string, slp : number ,d : string){
  const headers = { 'content-type': 'application/json'};
  const body = JSON.stringify({ username: user, sleep: slp, date : d});
  this.http.post<any[]>(this.urlApi + '/sleeps/addSleep', body, {'headers' : headers}).subscribe(
    (response) => {
      Swal.fire(response['message']);
      this.router.navigate(['/sleeps']);
    },
    (error) => {
      console.log(error);
    }
  );
}

getUserSleeps(user: string){
  const headers = { 'content-type': 'application/json'};
  const body = JSON.stringify({ username: user});
  return this.http.post<any[]>(this.urlApi + '/sleeps', body, {'headers' : headers}).pipe(map((res: any) => res['sleeps']));
}
}
