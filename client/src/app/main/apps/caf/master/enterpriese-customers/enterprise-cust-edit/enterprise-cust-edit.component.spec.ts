import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseCustEditComponent } from './enterprise-cust-edit.component';

describe('EnterpriseCustEditComponent', () => {
  let component: EnterpriseCustEditComponent;
  let fixture: ComponentFixture<EnterpriseCustEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseCustEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseCustEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
