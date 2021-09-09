import {Component, OnDestroy, OnInit} from '@angular/core';
import {WellBeing} from '../models/WellBeing.model';
import {MensurationService} from '../services/mensuration.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WellBeingWaterFilter} from '../models/WellBeingWaterFilter.model';

@Component({
  selector: 'app-historique-weight',
  templateUrl: './historique-weight.component.html',
  styleUrls: ['./historique-weight.component.css']
})
export class HistoriqueWeightComponent implements OnInit, OnDestroy {

  constructor(private mensurationService: MensurationService, private formBuilder: FormBuilder) {this.username = sessionStorage.getItem('user'); }

  wellBeings: WellBeing[];
  filterHistoriqueWeight: FormGroup;
  username: string;

  page = 1;
  limit = 4;
  maxSize = 3;
  totalPage: number;
  offset = 0;


  ngOnInit(): void {
    if (localStorage.getItem('reload') !== 'true') {
      window.location.reload();
      localStorage.setItem('reload', 'true');
    }
    this.getAllWeightHist(this.limit, this.offset);
    this.initForm();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('reload');
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
    this.mensurationService.getUsersWeightFilterApi(wellBeingWaterFilter, this.limit, this.offset).subscribe(response => {
      this.wellBeings = response;
    });
  }

// On reset les filtres
  reset() {
    window.location.reload();
  }

  createRange(): number[] {
    const items: number[] = [];
    if (this.page < this.totalPage) {
      let tempPage = this.page + 1;
      for (let i = 0; i < this.maxSize; i++) {
        if (tempPage <= this.totalPage) {
          items.push(tempPage++);
        }
      }
    } else {
      let tempPage = this.page - 1;
      for (let i = this.totalPage; i > tempPage; i--) {
        if (tempPage >= 1) {
          items.push(tempPage--);
        }
      }
    }
    return items;
  }

  pagePrevious(): void {
    this.offset -= 5;
    this.page--;
    this.getAllWeightHist(this.limit, this.offset);
  }

  pageNext(): void {
    this.offset += 5;
    this.page++;
    this.getAllWeightHist(this.limit, this.offset);
  }

  pageNumber(item: number): void {
    if (item > this.page) {
      this.offset += 5;
    } else {
      this.offset -= 5;
    }
    this.page = item;
    this.getAllWeightHist(this.limit, this.offset);
  }

  getAllWeightHist(limit: number, offset: number) {
    this.mensurationService.getUsersWeightsApiPageable(this.limit, this.offset).subscribe(response => {
      this.wellBeings = response;
      this.totalPage = Math.ceil(Math.round(response.total / this.limit));
      // Appel function pour récupérer le
    });
  }

}
