import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeIdComponent } from './add-employee-id.component';

describe('AddEmployeeIdComponent', () => {
  let component: AddEmployeeIdComponent;
  let fixture: ComponentFixture<AddEmployeeIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeeIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
