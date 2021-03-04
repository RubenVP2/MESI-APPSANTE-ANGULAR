import { Component, OnInit } from '@angular/core';
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
  url = '';
  id = [];
  username = '';
  constructor(private feedbackService : FeedbackService, private router : Router) { }

  ngOnInit(): void {
    this.url = this.router.url.toString();
    this.id = this.url.split('/', 3);
    this.feedbackService.getFeedbackById(this.id[2]);
    this.getFeedback();
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
