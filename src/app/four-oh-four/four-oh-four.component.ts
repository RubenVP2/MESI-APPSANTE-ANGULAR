import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-four-oh-four',
  templateUrl: './four-oh-four.component.html',
  styleUrls: ['./four-oh-four.component.css']
})
export class FourOhFourComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //Lors du cloque sur le bouton de la page html on redirige l'utilisateur sur l'url users (a modifier dans le futur)
  retourAccueil(){
    this.router.navigate(['/users']);
  }

}
