import {Component,  OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  username: string;

  constructor() {
    this.username = sessionStorage.getItem('user');
  }

  ngOnInit(): void {
    if (localStorage.getItem('reload') !== 'true') {
      window.location.reload();
      localStorage.setItem('reload', 'true');
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('reload');
  }

}
