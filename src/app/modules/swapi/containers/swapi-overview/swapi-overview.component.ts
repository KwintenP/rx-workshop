import {Component, OnInit} from '@angular/core';
import {StarWarsService} from '../../services/star-wars.service';
import {StarWarsCharacter} from '../../entities/star-wars-character.entity';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-swapi-overview',
  template: `
    <app-topbar></app-topbar>
    <div class="main">
      <div class="sidebar">
        <app-people-filter (search)="searchClicked($event)"></app-people-filter>
        <app-features></app-features>
      </div>
      <div class="content">
        <app-people-list [people]="people$ | async"></app-people-list>
      </div>
    </div>
  `,
  styleUrls: ['./swapi-overview.component.scss']
})
export class SwapiOverviewComponent implements OnInit {
  people$: Observable<Array<StarWarsCharacter>>;

  searchData$ = new BehaviorSubject<{ searchTerm: string }>({searchTerm: ''});

  constructor(private starwarService: StarWarsService) {
  }

  ngOnInit() {
    const data$ = this.searchData$
      .switchMap((data) => this.starwarService.getCharacters(1, data.searchTerm));

    this.people$ = data$
      .map((data) => data.results);
  }

  searchClicked(searchTerm) {
    this.searchData$.next({searchTerm});
  }
}
