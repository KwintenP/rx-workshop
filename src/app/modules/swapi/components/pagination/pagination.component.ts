import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"
            *ngFor="let page of pages"
            [class.active]="page === selectedPage"
            (click)="pageSelected(page)"><a class="page-link">{{page + 1}}</a></li>
      </ul>
    </nav>
  `,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() numberOfElements;
  @Output()
  pageChange = new EventEmitter<number>();

  selectedPage: number;
  pages: Array<number>;

  constructor() {
  }

  ngOnChanges() {
    this.pages = Array.from(Array(Math.ceil(this.numberOfElements / 10)).keys());
    this.selectedPage = 0;
  }

  pageSelected(page: number) {
    this.selectedPage = page;
    this.pageChange.emit(page + 1);
  }
}
