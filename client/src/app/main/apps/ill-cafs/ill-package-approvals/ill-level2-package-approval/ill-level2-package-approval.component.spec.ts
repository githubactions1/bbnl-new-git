import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllLevel2PackageApprovalComponent } from './ill-level2-package-approval.component';

describe('IllLevel2PackageApprovalComponent', () => {
  let component: IllLevel2PackageApprovalComponent;
  let fixture: ComponentFixture<IllLevel2PackageApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllLevel2PackageApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllLevel2PackageApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
