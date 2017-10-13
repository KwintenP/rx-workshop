import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-people-filter',
  template: `
    <h3>Server side filter</h3>
    <form (ngSubmit)="formSubmit()" novalidate [formGroup]="filterForm">
      <div class="form-group">
        <label for="search">Name</label>
        <input type="text" id="search" name="search" formControlName="search">
      </div>
      <button type="submit">Search</button>
    </form>
  `,
  styleUrls: ['./people-filter.component.scss']
})
export class PeopleFilterComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  filterForm;

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      search: ''
    });
  }

  ngOnInit() {
  }

  formSubmit() {
    this.search.emit(this.filterForm.value.search);
  }

}
