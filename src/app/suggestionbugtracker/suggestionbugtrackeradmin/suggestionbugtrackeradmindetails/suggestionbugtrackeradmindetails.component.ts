import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/Feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-suggestionbugtrackeradmindetails',
  templateUrl: './suggestionbugtrackeradmindetails.component.html',
  styleUrls: ['./suggestionbugtrackeradmindetails.component.css']
})
export class SuggestionbugtrackeradmindetailsComponent implements OnInit {

  oneFeedback: Feedback[];
  feedbackForm : FormGroup;
  url = '';
  id = [];
  username = '';
  constructor(private formBuilder: FormBuilder, private feedbackService : FeedbackService, private router : Router) { }

  ngOnInit(): void {
    this.url = this.router.url.toString();
    this.id = this.url.split('/', 3);
    this.feedbackService.getFeedbackById(this.id[2]);
    this.getFeedback();
    this.initForm();
  }

  initForm() {
    //on créé notre formulaire au lancement de la page les variables doivent correspondres aux id du html
    //public radioValue: string = this.oneFeedback[0].etat;
    this.feedbackForm = this.formBuilder.group({
      utilisateurTicket: ['', Validators.required],
      emailTicket: ['', Validators.required],
      dateTicket: ['', Validators.required],
      topicTicket: ['', Validators.required],
      descriptionTicket: ['', Validators.required],
      natureTicket: ['', Validators.required],
      radioEtat: ['', Validators.required],//pour rendre ce champs obligatoire on met ça dans un array et on le rend required avec Validator!
    });
  }

  onSubmitForm(form : NgForm) {
    console.log('onSubmitForm');
    const formValue = form.value;
    this.username = sessionStorage.getItem("user");
    console.log(form.value);
    this.feedbackService.updateFeedback(this.id[2], this.username, formValue['radioEtat']);
  }

  getFeedback() {
    this.feedbackService.feedbackSubject.subscribe(
      (response: any[]) => {
        this.oneFeedback = response;
      }
    );
    this.feedbackService.emitFeedbackSubject();
  }

  deleteFeedback() {
    this.username = sessionStorage.getItem("user");
    this.feedbackService.deleteFeedback(this.id[2], this.username);
  }
}
