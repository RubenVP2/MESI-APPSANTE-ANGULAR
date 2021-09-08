import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Aliment} from '../models/Aliment.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlimentService {

  private urlApi = 'http://localhost:5000';

  constructor(private http: HttpClient) {
  }
  // Recupère tous les aliments
  getAllAliments(limit: number, offset: number): Observable<any> {
    return this.http.get<Aliment[]>(`${this.urlApi}/aliments?limit=${limit}&offset=${offset}`).pipe(map((res: any) =>  res ));
  }

  addCaloriesTo
}
