import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiOverviewComponent } from './containers/swapi-overview/swapi-overview.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SwapiOverviewComponent, TopbarComponent]
})
export class SwapiModule { }
