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

  constructor(private wellBeingService : WellBeingService , private router : Router) { this.username = sessionStorage.getItem('user'); }

  ngOnInit(): void {
    this.getAllSleeps(this.username);
  }


  insertSleep(){
    return Swal.fire({
      title: 'Saisir la durée de votre sommeil',
      html: `<input type="text" id="sleep" class="swal2-input" placeholder="heures de sommeil en hh.mm">
              <input type="text" id="date" class="swal2-input" placeholder="date(aaaa-mm-jj)">`,
      confirmButtonText: 'Enregistrer',
      focusConfirm: false,
      preConfirm: () => {
        const sleep = Swal.getPopup().querySelector('#sleep')['value']
        const date = Swal.getPopup().querySelector('#date')['value']
        if (!sleep || !date) {
          Swal.showValidationMessage(`Veuillez saisir la durée de votre sommeil et la date correspondante`)
        }
        this.wellBeingService.insertSleep(this.username,sleep,date)
      }
    })
  }

  getAllSleeps(username: string){
    this.wellBeingService.getUserSleeps(username).subscribe(response => {
    this.sleeps = [];
    const se = response;
    for( let i = 0; i< 10 ; i++){
      const wellBeingS = new WellBeingReduced(se[i]['weight'],se[i]['sleep'],se[i]['date']);
      this.sleeps.push(wellBeingS);
    }
    })
  }

}
