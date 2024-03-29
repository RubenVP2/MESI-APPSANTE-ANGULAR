import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-four-oh-four',
  templateUrl: './four-oh-four.component.html',
  styleUrls: ['./four-oh-four.component.css']
})
export class FourOhFourComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  retour(){
    if (sessionStorage.getItem("user") == null){
      this.router.navigate(['/']);
      return false;
    }else {
      this.router.navigate(['/dashboard']);
    }
  }

}
