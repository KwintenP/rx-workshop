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
        <app-features></app-features>
      </div>
      <div class="content">
        <app-people-list [people]="people$ | async"></app-people-list>
        <app-pagination [numberOfElements]="count$ | async"
                        (pageChange)="pageChanged($event)"></app-pagination>
      </div>
    </div>
  `,
  styleUrls: ['./swapi-overview.component.scss']
})
export class SwapiOverviewComponent implements OnInit {
  people$: Observable<Array<StarWarsCharacter>>;
  count$: Observable<number>;
  page$: Observable<number>;

  searchData$ = new BehaviorSubject<{ searchTerm: string }>({searchTerm: ''});
  clientFilter$ = new ReplaySubject<{ showMale?: boolean, showFemale?: boolean, showNA?: boolean }>(1);
  pageChange$ = new BehaviorSubject<{ type: 'RESET' | 'NEXT', page?: number }>({type: 'NEXT', page: 1});

  constructor(private starwarService: StarWarsService) {
  }

  ngOnInit() {
    const filterTheCharactersBasedOnTheClienFilter = (results, filter) => {
      return results.filter(character =>
        character.gender === 'male' && filter.showMale ||
        character.gender === 'female' && filter.showFemale ||
        character.gender === 'n/a' && filter.showNA
      );
    };

    // @formatter:off
    // searchData:     ----s------------------t----------
    // pageChange$:    1--------2--------3----1----------
    //                      -combineLatest-
    //                 ----(s1)-(s2)-----(s3)-(s3)(t1)---
    //                      -debounceTime-
    //                 ----(s1)-(s2)-----(s3)-(t1)-------
    //                      -switchMap-
    //                 ----\     \       \     \
    //                      -r|   ---r|   ----!  -----r|
    //                 ------r-------r----------------r--
    //                      -shareReplay-
    // @formatter:on
    const data$ = this.searchData$
      .combineLatest(this.pageChange$, (search, page) => page.type === 'RESET' ? {search, page: 1} : {
        search,
        page: page.page
      })
      .debounceTime(0)
      .switchMap((data) => this.starwarService.getCharacters(data.page, data.search.searchTerm))
      .shareReplay(1);

    // @formatter:off
    // data$:         ------r-------r----------------r--
    //                     -map-
    //                ------r-------r----------------r--
    // clientFilter$: c----------------------c-------r--
    //                    -combineLatest-
    //                ------f-------f--------f-------f--  f: filtered results
    // @formatter:on
    this.people$ = data$
      .map((data) => data.results)
      .combineLatest(this.clientFilter$, filterTheCharactersBasedOnTheClienFilter);

    // @formatter:off
    // data$:         ------r-------r----------------r--
    //                     -map-
    //                ------c-------c----------------c--
    // @formatter:on
    this.count$ = data$
      .map((data) => data.count);

    // @formatter:off
    // pageChanges$:         ------r-------r----------------r--
    //                          -map-
    //                       ------p-------p----------------p--
    // @formatter:on
    this.page$ = this.pageChange$
      .map(data => data.page);
  }

  searchClicked(searchTerm) {
    this.pageChange$.next({type: 'RESET'});
    this.searchData$.next({searchTerm});
  }

  filterChanged(val) {
    this.clientFilter$.next(val);
  }

  pageChanged(page) {
    this.pageChange$.next({type: 'NEXT', page});
  }
}
