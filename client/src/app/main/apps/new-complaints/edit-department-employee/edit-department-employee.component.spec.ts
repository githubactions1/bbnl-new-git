import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDepartmentEmployeeComponent } from './edit-department-employee.component';

describe('EditDepartmentEmployeeComponent', () => {
  let component: EditDepartmentEmployeeComponent;
  let fixture: ComponentFixture<EditDepartmentEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDepartmentEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDepartmentEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
