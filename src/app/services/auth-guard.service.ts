import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service'; // A modifier avec le service que va créer Jose
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, // A modifier avec le service que va créer Jose
              private router: Router) { }

  //Si l'utilisateur est connécté on le laisse acceder aux url , sinon on le redirige vers la page de connexion 'login'
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isAuth) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
