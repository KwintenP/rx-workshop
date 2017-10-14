import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  template: `
    <div>
      <ul>
        <li>Server side filtering</li>
        <li>Client side filtering</li>
        <li>Paging</li>
        <li>Cancelling of requests</li>
        <li>Page reset</li>
      </ul>
    </div>
  `,
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
