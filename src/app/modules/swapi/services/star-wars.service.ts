import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishReplay';
import {StarWarsCharacter} from '../entities/star-wars-character.entity';
import {StarWarsResult} from '../entities/star-wars-result.entity';

@Injectable()
export class StarWarsService {

  constructor(private http: Http) {

  }

  // url: https://swapi.co/api/people/?page=...&search=..
  public getCharacters(page: number = 1, searchTerm?: string): Observable<StarWarsResult> {

  }
}
