import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllPackageApprovalsComponent } from './ill-package-approvals.component';

describe('IllPackageApprovalsComponent', () => {
  let component: IllPackageApprovalsComponent;
  let fixture: ComponentFixture<IllPackageApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllPackageApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllPackageApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
