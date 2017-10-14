import {Component, OnInit} from '@angular/core';
import {StarWarsService} from '../../services/star-wars.service';
import {StarWarsCharacter} from '../../entities/star-wars-character.entity';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Component({
  selector: 'app-swapi-overview',
  template: `
    <app-topbar></app-topbar>
    <div class="main">
      <div class="sidebar">
        <app-people-filter (search)="searchClicked($event)"></app-people-filter>
        <app-people-filter-client-side (filterChanged)="filterChanged($event)"></app-people-filter-client-side>
      </div>
      <div class="content">
        <app-people-list [people]="people$ | async"></app-people-list>
        {{count$ | async}}
        <ngb-pagination [collectionSize]="count$ | async"
                        (pageChange)="pageChange.next($event)"
                        aria-label="Default pagination"></ngb-pagination>
      </div>
    </div>
  `,
  styleUrls: ['./swapi-overview.component.scss']
})
export class SwapiOverviewComponent implements OnInit {
  people$: Observable<Array<StarWarsCharacter>>;
  count$: Observable<number>;

  searchData = new BehaviorSubject<{ searchTerm: string }>({searchTerm: ''});
  clientFilter = new ReplaySubject<{ showMale?: boolean, showFemale?: boolean, showNA?: boolean }>(1);
  pageChange = new BehaviorSubject<number>(0);

  constructor(private starwarService: StarWarsService) {
  }

  ngOnInit() {
    const page$ = this.pageChange
      .map(val => val + 1);

    const data$ = this.searchData.combineLatest(page$)
      .switchMap(([data, page]) => this.starwarService.getCharacters(page, data.searchTerm));

    this.people$ = data$
      .map((data) => data.results)
      .combineLatest(this.clientFilter, (results, filter) => {
        return results.filter(character =>
          character.gender === 'male' && filter.showMale ||
          character.gender === 'female' && filter.showFemale ||
          character.gender === 'n/a' && filter.showNA
        );
      });

    this.count$ = data$
      .map((data) => data.count);
  }

  searchClicked(searchTerm) {
    this.pageChange.next(0);
    this.searchData.next({searchTerm});
  }

  filterChanged(val) {
    this.clientFilter.next(val);
  }
}
