import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingReportComponent } from './sharing-report.component';

describe('SharingReportComponent', () => {
  let component: SharingReportComponent;
  let fixture: ComponentFixture<SharingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
