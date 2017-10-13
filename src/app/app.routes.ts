import {Routes} from '@angular/router';
import {SwapiOverviewComponent} from './modules/swapi/containers/swapi-overview/swapi-overview.component';

export const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'swapi'
  },
  {
    path: 'swapi', pathMatch: 'full', component: SwapiOverviewComponent
  }
];
