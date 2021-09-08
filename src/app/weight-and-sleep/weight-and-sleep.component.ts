import { Component, OnInit } from '@angular/core';
import { WellBeingReduced } from '../models/WellBeingReduced.model';
import { WellBeingService } from '../services/well-being.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-weight-and-sleep',
  templateUrl: './weight-and-sleep.component.html',
  styleUrls: ['./weight-and-sleep.component.css']
})
export class WeightAndSleepComponent implements OnInit {

  username: string;
  sleeps: WellBeingReduced[];
  weights: WellBeingReduced[];
  test: any;

  constructor(private wellBeingService : WellBeingService , private router : Router) { this.username = sessionStorage.getItem('user'); }

  ngOnInit(): void {
    this.wellBeingService.getWellBeing(this.username);
    const w = new WellBeingReduced(80,12,"Today");
    this.sleeps = [];
    this.weights = [];

    const se = this.wellBeingService.wellBeing['sleeps'];
    const we = this.wellBeingService.wellBeing['weights'];
    this.test = we[0]['weight'];
    for( let i = 0; i< 5 ; i++){
      const wellBeingS = new WellBeingReduced(se[i]['weight'],se[i]['sleep'],se[i]['date']);
      this.sleeps.push(wellBeingS);
      const wellBeingW = new WellBeingReduced(we[i]['weight'],we[i]['sleep'],we[i]['date']);
      this.weights.push(wellBeingW);
    }
  }
  
  
  insertSleep(){
    return Swal.fire({
      title: 'Saisir la durée de votre sommeil',
      html: `<input type="text" id="sleep" class="swal2-input" placeholder="heures de sommeil en hh.mm">`,
      confirmButtonText: 'Enregistrer',
      focusConfirm: false,
      preConfirm: () => {
        const sleep = Swal.getPopup().querySelector('#sleep')['value']
        if (!sleep) {
          Swal.showValidationMessage(`Veuillez saisir la durée de votre sommeil`)
        }
        this.wellBeingService.insertSleep(this.username,sleep)
      }
    })
  }

  insertWeight(){
    return Swal.fire({
      title: 'Saisir votre poids',
      html: `<input type="text" id="weight" class="swal2-input" placeholder="Poids en kg">`,
      confirmButtonText: 'Enregistrer',
      focusConfirm: false,
      preConfirm: () => {
        const weight = Swal.getPopup().querySelector('#weight')['value']
        if (!weight) {
          Swal.showValidationMessage(`Veulliez saisir votre poids`)
        }
        this.wellBeingService.insertWeight(this.username,weight)
      }
    })
  }

}
