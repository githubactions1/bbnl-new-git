import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGeneralEquiryTicketsComponent } from './edit-general-equiry-tickets.component';

describe('EditGeneralEquiryTicketsComponent', () => {
  let component: EditGeneralEquiryTicketsComponent;
  let fixture: ComponentFixture<EditGeneralEquiryTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGeneralEquiryTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGeneralEquiryTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
