import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComplaintSlaComponent } from './edit-complaint-sla.component';

describe('EditComplaintSlaComponent', () => {
  let component: EditComplaintSlaComponent;
  let fixture: ComponentFixture<EditComplaintSlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComplaintSlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComplaintSlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
