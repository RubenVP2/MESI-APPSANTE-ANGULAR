import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { WellBeing } from "../models/WellBeing.model";
import { UserService } from "./user.service";

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


    // Recupère les utilisateurs
    getUsersWatersApi() {
      // Requete http pour récupéreer les utilisateurs
      // return this.http.get<any[]>(this.urlApi + '/test/user/all');
      this.http.get<any[]>(this.urlApi + '/user/water/'+ this.idSession).subscribe(
        (response) => {
          //users etant le nom de {} dans l'url de l'api
          this.wellBeings = response['userWater'];
          //console.log(this.users[0]);
          this.emitUserWaterSubject();
        },
        (error) => {
          console.log(error);
        }
      );
    }

    getWaterById(id: number) {
      const wellBeing = this.wellBeings.find(
        (s) => {
          return s.id_well_being === id;
        }
      );
      this.emitUserWaterSubject();
      return wellBeing.water;
    }

    getWeightById(id: number) {
      const wellBeing = this.wellBeings.find(
        (s) => {
          return s.id_well_being === id;
        }
      );
      return wellBeing.weight;
  }

  getDateById(id: number) {
    const wellBeing = this.wellBeings.find(
      (s) => {
        return s.id_well_being === id;
      }
    );
    return wellBeing.date;
  }

  getTotalNecessaryById(id: number) {
    const wellBeing = this.wellBeings.find(
      (s) => {
        return s.id_well_being === id;
      }
    );
    this.resultatById = ((wellBeing.weight-20)*15+1500)/1000;
    this.resultatById = Math.round(this.resultatById * 100) / 100;
    return this.resultatById;
  }


  getTotalNecessary(id: number){
    //On recupere le poids de la personne sur l'id envoyé en param a l'aide de la méthode getColor(id :number)
    this.resultatF = ((this.wellBeings[id].weight-20)*15+1500)/1000;
    this.resultatF =  Math.round(this.resultatF * 10) / 10
    return this.resultatF;
  }

}
