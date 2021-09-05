import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/Feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestionbugtrackeradmin',
  templateUrl: './suggestionbugtrackeradmin.component.html',
  styleUrls: ['./suggestionbugtrackeradmin.component.css']
})
export class SuggestionbugtrackeradminComponent implements OnInit {

  feedbacks: Feedback[];

  constructor(private feedbackService: FeedbackService, private router : Router) { }

  ngOnInit(): void {
    this.feedbackService.getFeedbacks();
    this.getAllFeedbacks();
  }

  getAllFeedbacks() {
    this.feedbackService.feedbackSubject.subscribe(
      (response: any[]) => {
        this.feedbacks = response;
        //console.log(this.feedbacks);
      }
    );
    this.feedbackService.emitFeedbackSubject();
  }
}
