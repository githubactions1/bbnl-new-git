import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OltDashboardComponent } from './olt-dashboard.component';

describe('OltDashboardComponent', () => {
  let component: OltDashboardComponent;
  let fixture: ComponentFixture<OltDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OltDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OltDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
