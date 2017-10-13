import {Component, Input, OnInit} from '@angular/core';
import {StarWarsCharacter} from '../../entities/star-wars-character.entity';

@Component({
  selector: 'app-people-list',
  template: `
    <h3>People</h3>
    <ul>
      <li *ngFor="let person of people">
        {{person.name}}
      </li>
    </ul>
  `,
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  @Input() people: Array<StarWarsCharacter>;

  constructor() {
  }

  ngOnInit() {
  }

}
