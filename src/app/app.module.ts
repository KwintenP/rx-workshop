import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {SwapiModule} from './modules/swapi/swapi.module';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SwapiModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
