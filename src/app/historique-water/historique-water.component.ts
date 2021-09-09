import {Component, OnInit} from '@angular/core';
import { WellBeing } from '../models/WellBeing.model';
import { UserWaterService } from '../services/user-water.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WellBeingWaterFilter} from '../models/WellBeingWaterFilter.model';



@Component({
  selector: 'app-historique-water',
  templateUrl: './historique-water.component.html',
  styleUrls: ['./historique-water.component.css']
})
export class HistoriqueWaterComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private userWaterService: UserWaterService) { this.username = sessionStorage.getItem('user'); }
  wellBeings: WellBeing[];
  result: Number;
  resultatF = 0;
  filterHistoriqueWater: FormGroup;
  username: string;
  page = 1;
  limit = 3;
  maxSize = 3;
  totalPage: number;
  offset = 0;

  ngOnInit(): void {
    if (localStorage.getItem('reload') !== 'true') {
      window.location.reload();
      localStorage.setItem('reload', 'true');
    }
    this.getAllWaterHist(this.limit, this.offset);
    this.initForm();
  }

    // On calcul le taux d'eau néceissaire pour une personne suivant son poids au jour Date calculé a l'aide du poids
  getTotalNecessary(id: number){
    if (this.wellBeings[id].water != null && this.wellBeings[id].weight != null){
      // On recupere le poids de la personne sur l'id envoyé en param a l'aide de la méthode getColor(id :number)
      this.resultatF = ((this.wellBeings[id].weight - 20) * 15 + 1500) / 1000;
      this.resultatF =  Math.round(this.resultatF * 10) / 10;
      return this.resultatF;
    }else if (this.wellBeings[id].water == null || this.wellBeings[id].weight == null) {
      return this.resultatF = 0;
    }
  }

    getColor(id: number){
      // Appelle de la méthode getTotalNecessary(id) avec l'id de la liste (le 'i' dans le html) en param
        this.result = this.getTotalNecessary(id);
        console.log(this.result);
        if (this.result == 0){
          return 'green';
        }
        else if (this.wellBeings[id].water >= this.result){
          return '#458FF4';
        }
        else if (this.wellBeings[id].water < this.result){
          return 'red';
        }
    }

  initForm(){
    this.filterHistoriqueWater = this.formBuilder.group({
      // On récupere les infos des deux filtres calender
      calendarStartFilter: ['', Validators.required],
      calendarEndFilter: ['', Validators.required]
    });
  }

  onSubmitForm(){
    // formValue recupere les informations du formulaire
    const formValue = this.filterHistoriqueWater.value;
    // On créé l'instance wellBeingWaterFilter qui permettra de retourner notre nouvelle liste
    const wellBeingWaterFilter = new WellBeingWaterFilter(
      formValue.calendarStartFilter,
      formValue.calendarEndFilter
    );
    // Appel de la méthode POST pour recueprer la liste de résultat en fonction du filtre
    this.userWaterService.getUsersWatersFilterApi(wellBeingWaterFilter).subscribe(response => {
      this.wellBeings = response;
      this.totalPage = Math.ceil(response.total / this.limit);
    });
  }

  // On reset les filtres
  reset() {
    window.location.reload();
  }

  createRange(): number[] {
    const items: number[] = [];
    let tempPage = this.page + 1;
    for (let i = 0; i < this.maxSize; i++) {
      if (tempPage<=this.totalPage){
        items.push(tempPage++);
      }
      else{
        items.push(tempPage--);
      }
    }
    return items;
  }

  pagePrevious(): void {
    this.offset -= 5;
    this.page--;
    this.getAllWaterHist(this.limit, this.offset);
  }

  pageNext(): void {
    this.offset += 5;
    this.page++;
    this.getAllWaterHist(this.limit, this.offset);
  }

  pageNumber(item: number): void {
    this.offset += 5;
    this.page = item;
    this.getAllWaterHist(this.limit, this.offset);
  }

  getAllWaterHist(limit: number, offset: number){
    this.userWaterService.getUsersWatersApiPageable(this.limit, this.offset).subscribe(response => {
      this.wellBeings = response.userWater;
      this.totalPage = Math.ceil(response.total / this.limit);
      console.log("laalal" + this.totalPage);
    });
  }
}
