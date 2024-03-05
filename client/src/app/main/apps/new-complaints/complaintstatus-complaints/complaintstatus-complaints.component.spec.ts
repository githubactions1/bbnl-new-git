import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintstatusComplaintsComponent } from './complaintstatus-complaints.component';

describe('ComplaintstatusComplaintsComponent', () => {
  let component: ComplaintstatusComplaintsComponent;
  let fixture: ComponentFixture<ComplaintstatusComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintstatusComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintstatusComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
