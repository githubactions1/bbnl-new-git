import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BbnlEntDashboardComponent } from './bbnl-ent-dashboard.component';

describe('BbnlEntDashboardComponent', () => {
  let component: BbnlEntDashboardComponent;
  let fixture: ComponentFixture<BbnlEntDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbnlEntDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbnlEntDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
