import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiOverviewComponent } from './containers/swapi-overview/swapi-overview.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { PeopleFilterComponent } from './components/people-filter/people-filter.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import {StarWarsService} from './services/star-wars.service';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import { PeopleFilterClientSideComponent } from './components/people-filter-client-side/people-filter-client-side.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    NgbPaginationModule.forRoot(),
  ],
  providers: [
    StarWarsService
  ],
  declarations: [SwapiOverviewComponent, TopbarComponent, PeopleFilterComponent, PeopleListComponent, PeopleFilterClientSideComponent]
})
export class SwapiModule { }
