import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { WellBeing } from "../models/WellBeing.model";
import { UserService } from "./user.service";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserWaterService{

    wellBeingWaterSubject = new Subject<any[]>();

    constructor(private http: HttpClient, private userService: UserService) { }

    private wellBeings : WellBeing[] = [];

    idSession = 1;

    resultatF =0;
    resultatById=0;

    private urlApi = "http://localhost:5000";

    emitUserWaterSubject() {
      this.wellBeingWaterSubject.next(this.wellBeings.slice());
    }

    // Recupère les informations de la tables WELL_BEING (water date poids)
    getUsersWatersApi() {
      return this.http.get(this.urlApi + '/user/water/' + this.idSession).pipe(map((res: any) => res['userWater']));
    }



  saveAppareilsToServer(){
    this.http.put(this.urlApi, this.wellBeings).subscribe(
      ()=>{
        console.log("enregistrement terminus")
      },
      (error)=>{
        console.log("erreur")
      }
    )
  }


  modifWater(wellBeing :WellBeing){
    const wellBeingObject = new WellBeing();
    wellBeingObject.water = wellBeing.water;
    wellBeingObject.date = wellBeing.date;

    this.wellBeings.push(wellBeingObject);
    this.emitUserWaterSubject();
  }

}
