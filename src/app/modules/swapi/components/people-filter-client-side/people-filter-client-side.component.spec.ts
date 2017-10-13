import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleFilterClientSideComponent } from './people-filter-client-side.component';

describe('PeopleFilterClientSideComponent', () => {
  let component: PeopleFilterClientSideComponent;
  let fixture: ComponentFixture<PeopleFilterClientSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleFilterClientSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleFilterClientSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
