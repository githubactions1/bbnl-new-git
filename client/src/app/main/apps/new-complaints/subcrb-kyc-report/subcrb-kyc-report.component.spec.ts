import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcrbKycReportComponent } from './subcrb-kyc-report.component';

describe('SubcrbKycReportComponent', () => {
  let component: SubcrbKycReportComponent;
  let fixture: ComponentFixture<SubcrbKycReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcrbKycReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcrbKycReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
