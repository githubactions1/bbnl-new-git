import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BbnlDashboardComponent } from './bbnl-dashboard.component';

describe('BbnlDashboardComponent', () => {
  let component: BbnlDashboardComponent;
  let fixture: ComponentFixture<BbnlDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbnlDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbnlDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
