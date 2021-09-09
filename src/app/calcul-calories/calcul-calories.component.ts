import { Component, Input, OnInit } from '@angular/core';
import { Aliment } from '../models/Aliment.model';
import { AlimentService } from '../services/aliment.service';
import { WellBeing } from '../models/WellBeing.model';
import { DatePipe } from '@angular/common';
import { UserWaterService } from '../services/user-water.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { WellBeingWaterFilter } from '../models/WellBeingWaterFilter.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calcul-calories',
  templateUrl: './calcul-calories.component.html',
  styleUrls: ['./calcul-calories.component.css']
})
export class CalculCaloriesComponent implements OnInit {

  aliments?: Aliment[];
  alimentsSelected?: Aliment[] = [];
  totalCalories = 0;
  page = 1;
  limit = 15;
  maxSize = 3;
  totalPage: number;
  offset = 0;
  caloriesDuJour?: number;
  dateInput = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  filterWellBeing: FormGroup;

  constructor(private formBuilder: FormBuilder, private alimentService: AlimentService, private datepipe: DatePipe, private userWaterService: UserWaterService) {
    // Récupération des aliments
    this.getAliments(this.limit, this.offset);
    // Récupération des calories du jour
    this.getCaloriesOfDay(new Date(this.dateInput));
    this.filterWellBeing = this.formBuilder.group({
      // On récupere les infos des deux filtres calender
      calendarDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  getAliments(limit: number, offset: number): void {
    this.alimentService.getAllAliments(this.limit, this.offset).subscribe((res) => {
      this.aliments = res.aliments;
      this.totalPage = Math.ceil(Math.round(res.total / this.limit));
    });
  }

  getCaloriesOfDay(dateOfDay: Date): void {
    const wellBeingFilter = new WellBeingWaterFilter(
      dateOfDay,
      dateOfDay
    );
    this.userWaterService.getCaloriesOfDay(wellBeingFilter).subscribe((res) => this.caloriesDuJour = res[0].calories);
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
    this.offset -= 25;
    this.page--;
    this.getAliments(this.limit, this.offset);
  }

  pageNext(): void {
    this.offset += 25;
    this.page++;
    this.getAliments(this.limit, this.offset);
  }

  pageNumber(item: number): void {
    if (item > this.page) {
      this.offset += 25;
    } else {
      this.offset -= 25;
    }
    this.page = item;
    this.getAliments(this.limit, this.offset);
  }

  addAliment(aliment: Aliment): void {
    const isInArray = this.alimentsSelected.find(a => a.Id === aliment.Id);
    if (isInArray) {
      this.totalCalories -= aliment.calories;
      this.alimentsSelected = this.alimentsSelected.filter(a => a.Id !== aliment.Id);
    } else {
      this.totalCalories += aliment.calories;
      this.alimentsSelected.push(aliment);
    }
  }

  insererLesCalories(): void {

    Swal.fire({
      title: 'Confirmation',
      text: 'Confirmez-vous l\'ajout de ces aliments ?',
      showCancelButton: true,
      confirmButtonText: 'Sauvegarder',
      icon: 'question',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const wellBeing = new WellBeing(0, this.totalCalories,
          0, 0, 0, 0, 0, this.filterWellBeing.value.calendarDate, sessionStorage.getItem('user')
        );
        this.userWaterService.addWater(wellBeing);
      }
    });
  }
}
