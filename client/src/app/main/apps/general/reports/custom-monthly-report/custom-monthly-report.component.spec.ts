import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMonthlyReportComponent } from './custom-monthly-report.component';

describe('CustomMonthlyReportComponent', () => {
  let component: CustomMonthlyReportComponent;
  let fixture: ComponentFixture<CustomMonthlyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMonthlyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMonthlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
