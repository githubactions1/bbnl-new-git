import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsDashboardComponent } from './complaints-dashboard.component';

describe('ComplaintsDashboardComponent', () => {
  let component: ComplaintsDashboardComponent;
  let fixture: ComponentFixture<ComplaintsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
