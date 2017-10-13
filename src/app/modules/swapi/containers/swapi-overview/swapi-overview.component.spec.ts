import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapiOverviewComponent } from './swapi-overview.component';

describe('SwapiOverviewComponent', () => {
  let component: SwapiOverviewComponent;
  let fixture: ComponentFixture<SwapiOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapiOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapiOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
