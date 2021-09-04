import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FeedbackService} from '../services/feedback.service';
import { NewFeedback } from '../models/NewFeedback.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-suggestionbugtracker',
  templateUrl: './suggestionbugtracker.component.html',
  styleUrls: ['./suggestionbugtracker.component.css']
})

export class SuggestionbugtrackerComponent implements OnInit {

  closeResult: string;
  feedbackForm : FormGroup;
  username = '';

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    //on créé notre formulaire au lancement de la page les variables doivent correspondres aux id du html
    this.feedbackForm = this.formBuilder.group({
      nature: ['', Validators.required],//pour rendre ce champs obligatoire on met ça dans un array et on le rend required avec Validator!
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmitForm(form : NgForm) {
    //formValue recupere les informations du formulaire grace a userForm qui est un object de type FormGroup
    const formValue = form.value;
    if (this.isValidForm(formValue)) {
      this.username = sessionStorage.getItem("user");
      console.log(this.username);
      console.log(formValue['nature']);
      //On créé l'instance User qu'on va ensuite ajouter a notre liste
      const feedback = new NewFeedback(
        this.username, // TODO : mettre direct sessionStorage.getItem("user")
        formValue['nature'],
        formValue['title'],
        formValue['description'],
      );
      console.log(feedback);
      this.feedbackService.addFeedback(feedback);
    }
  }

  isValidForm(formValue : any) : boolean {
    // WARNING : user can be null, care about how it react
    if (formValue['nature'] == "") {
      console.log("La nature ne peut être vide.")
      Swal.fire({
        text: "La nature ne peut être vide.",
        icon : "error",
      });
      return false;
    } else if (formValue['title'] == "") {
      console.log("Le titre ne peut être vide.")
      Swal.fire({
        text: "Le titre ne peut être vide.",
        icon : "error",
      });
      return false;
    } else if (formValue['title'].length > 50) {
      console.log("Le titre ne peut excéder 50 caractère.")
      Swal.fire({
        text: "Le titre ne peut excéder 50 caractère.",
        icon : "error",
      });
      return false;
    } else if (formValue['description'] == "") {
      console.log("La description ne peut être vide.")
      Swal.fire({
        text: "La description ne peut être vide.",
        icon : "error",
      });
      return false;
    }
    console.log("La formulaire est bon")
    return true;
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
}

