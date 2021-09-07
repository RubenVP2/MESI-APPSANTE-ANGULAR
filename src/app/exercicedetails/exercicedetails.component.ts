import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewExercice } from '../models/NewExercice.model';
import { ProgrammessportifsService } from '../services/programmessportifs.service';
import { Result} from '../models/Result.model';

@Component({
  selector: 'app-exercicedetails',
  templateUrl: './exercicedetails.component.html',
  styleUrls: ['./exercicedetails.component.css']
})
export class ExercicedetailsComponent implements OnInit {

  closeResult: string;
  oneExercice: NewExercice[];
  results: Result[];
  exerciceForm : FormGroup;
  resultForm : FormGroup;
  url = '';
  id = [];
  username = '';
  constructor(private modalService: NgbModal, private _location: Location, private formBuilder: FormBuilder, private programmessportifsService : ProgrammessportifsService, private router : Router) { }

  ngOnInit(): void {
    this.url = this.router.url.toString();
    this.id = this.url.split('/', 3);
    this.programmessportifsService.getExerciceById(this.id[2]);
    this.getExercice();
    this.programmessportifsService.getResult(this.id[2], sessionStorage.getItem("user"));
    this.getResult();
    this.initForm();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getBack() {
    this._location.back();
  }

  initForm() {
    //on créé notre formulaire au lancement de la page les variables doivent correspondres aux id du html
    //public radioValue: string = this.oneFeedback[0].etat;
    this.exerciceForm = this.formBuilder.group({
      nomExercice: ['', Validators.required],
      nomMuscle: ['', Validators.required],
      nbReps: ['', Validators.required],
      nbSeries: ['', Validators.required],
      restExercice: ['', Validators.required],
      restSeries: ['', Validators.required],
    });

    this.resultForm = this.formBuilder.group({
      weight: ['', Validators.required],
    });
  }

  onSubmitForm(form : NgForm) {
    console.log('onSubmitForm');
    const formValue = form.value;
    this.username = sessionStorage.getItem("user");
    console.log(form.value);
    this.programmessportifsService.updateExercice(this.id[2], this.username,
      formValue['nbReps'], formValue['nbSeries'], formValue['restExercice'], formValue['restSeries']);
  }

  onSubmitFormResultat(form : NgForm) {
    console.log('onSubmitFormResultat');
    const formValue = form.value;
    this.username = sessionStorage.getItem("user");
    console.log(form.value);
    this.programmessportifsService.addResult(this.id[2], this.username,
      formValue['weight']);
  }

  getResult(){
    this.programmessportifsService.resultSubject.subscribe(
      (response: any[]) => {
        this.results = response;
      }
    );
    this.programmessportifsService.emitResultSubject();
  }

  getExercice() {
    this.programmessportifsService.exerciceSubject.subscribe(
      (response: any[]) => {
        this.oneExercice = response;
      }
    );
    this.programmessportifsService.emitExerciceSubject();
  }

  deleteExercice() {
    this.username = sessionStorage.getItem("user");
    this.programmessportifsService.deleteExercice(this.id[2], this.username);
  }

}
