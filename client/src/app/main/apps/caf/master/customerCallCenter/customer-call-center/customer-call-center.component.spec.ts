import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCallCenterComponent } from './customer-call-center.component';

describe('CustomerCallCenterComponent', () => {
  let component: CustomerCallCenterComponent;
  let fixture: ComponentFixture<CustomerCallCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCallCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCallCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
