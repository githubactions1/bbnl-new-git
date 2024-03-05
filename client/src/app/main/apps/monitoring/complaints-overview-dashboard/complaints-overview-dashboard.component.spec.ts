import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsOverviewDashboardComponent } from './complaints-overview-dashboard.component';

describe('ComplaintsOverviewDashboardComponent', () => {
  let component: ComplaintsOverviewDashboardComponent;
  let fixture: ComponentFixture<ComplaintsOverviewDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsOverviewDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsOverviewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
