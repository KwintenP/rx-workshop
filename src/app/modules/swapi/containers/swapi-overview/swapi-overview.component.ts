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
        <app-people-filter-client-side (filterChanged)="filterChanged($event)"></app-people-filter-client-side>
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
  clientFilter$ = new ReplaySubject<{ showMale?: boolean, showFemale?: boolean, showNA?: boolean }>(1);

  constructor(private starwarService: StarWarsService) {
  }

  ngOnInit() {
    const data$ = this.searchData$
      .switchMap((data) => this.starwarService.getCharacters(1, data.searchTerm));

    this.people$ = data$
      .map((data) => data.results)
      .combineLatest(this.clientFilter$, (results, filter) => {
        return results.filter(character =>
          character.gender === 'male' && filter.showMale ||
          character.gender === 'female' && filter.showFemale ||
          character.gender === 'n/a' && filter.showNA
        );
      });

  }

  searchClicked(searchTerm) {
    this.searchData$.next({searchTerm});
  }

  filterChanged(val) {
    this.clientFilter$.next(val);
  }
}
