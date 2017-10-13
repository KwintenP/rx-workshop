import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-people-filter-client-side',
  template: `
    <h3>Client side filter</h3>
    <form novalidate [formGroup]="filterForm">
      <div class="formGroup">
        <label for="showMale">Show male</label>
        <input type="checkbox" id="forMale" name="forMale" />
      </div>
    </form>
  `,
  styleUrls: ['./people-filter-client-side.component.scss']
})
export class PeopleFilterClientSideComponent implements OnInit {
  filterForm;

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      showMale: true,
      showFemale: true,
      showNA: true,
    });
  }

  ngOnInit() {
  }

}
