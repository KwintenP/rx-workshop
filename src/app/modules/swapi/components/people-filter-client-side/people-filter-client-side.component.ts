import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-people-filter-client-side',
  template: `
    <h3>Client side filter</h3>
    <form novalidate [formGroup]="filterForm">
      <div class="formGroup">
        <label for="showMale">Show male</label>
        <input type="checkbox" id="forMale" name="forMale" formControlName="showMale"/>
      </div>
      <div class="formGroup">
        <label for="showFemale">Show female</label>
        <input type="checkbox" id="showFemale" name="showFemale" formControlName="showFemale"/>
      </div>
      <div class="formGroup">
        <label for="showNA">Show N/A</label>
        <input type="checkbox" id="showNA" name="showNA" formControlName="showNA"/>
      </div>
    </form>
  `,
  styleUrls: ['./people-filter-client-side.component.scss']
})
export class PeopleFilterClientSideComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<boolean>();

  filterForm;

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      showMale: true,
      showFemale: true,
      showNA: true,
    });
  }

  ngOnInit() {
    this.filterChanged.emit(this.filterForm.value);

    this.filterForm.valueChanges
      .subscribe(this.filterChanged);
  }

}
