import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidDashboardComponent } from './prepaid-dashboard.component';

describe('PrepaidDashboardComponent', () => {
  let component: PrepaidDashboardComponent;
  let fixture: ComponentFixture<PrepaidDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepaidDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaidDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
