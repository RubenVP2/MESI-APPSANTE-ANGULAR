import { Component, OnInit } from '@angular/core';
import {WellBeing} from '../models/WellBeing.model';
import {MensurationService} from '../services/mensuration.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WellBeingWaterFilter} from '../models/WellBeingWaterFilter.model';

@Component({
  selector: 'app-historique-weight',
  templateUrl: './historique-weight.component.html',
  styleUrls: ['./historique-weight.component.css']
})
export class HistoriqueWeightComponent implements OnInit {

  constructor(private mensurationService: MensurationService, private formBuilder: FormBuilder) {this.username = sessionStorage.getItem('user'); }

  wellBeings: WellBeing[];
  filterHistoriqueWeight: FormGroup;
  username: string;


  ngOnInit(): void {
    this.mensurationService.getUsersWeightsApi().subscribe(response => {
      this.wellBeings = response;
      console.log('Tableau = ' + this.wellBeings);
      // Appel function pour récupérer le
    });
    this.initForm();
  }

  initForm(){
    this.filterHistoriqueWeight = this.formBuilder.group({
      // On récupere les infos des deux filtres calender
      calendarStartFilter: ['', Validators.required],
      calendarEndFilter: ['', Validators.required]
    });
  }

  onSubmitForm(){
    // formValue recupere les informations du formulaire
    const formValue = this.filterHistoriqueWeight.value;
    // On créé l'instance wellBeingWaterFilter qui permettra de retourner notre nouvelle liste
    const wellBeingWaterFilter = new WellBeingWaterFilter(
      formValue.calendarStartFilter,
      formValue.calendarEndFilter
    );
    // Appel de la méthode POST pour recueprer la liste de résultat en fonction du filtre
    this.mensurationService.getUsersWeightFilterApi(wellBeingWaterFilter).subscribe(response => {
      this.wellBeings = response;
    });
  }

// On reset les filtres
  reset() {
    window.location.reload();
  }

}
