import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoiCustomerComponent } from './goi-customer.component';

describe('GoiCustomerComponent', () => {
  let component: GoiCustomerComponent;
  let fixture: ComponentFixture<GoiCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoiCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoiCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
