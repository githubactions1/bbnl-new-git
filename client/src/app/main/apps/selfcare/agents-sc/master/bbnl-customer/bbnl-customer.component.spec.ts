import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BbnlCustomerComponent } from './bbnl-customer.component';

describe('BbnlCustomerComponent', () => {
  let component: BbnlCustomerComponent;
  let fixture: ComponentFixture<BbnlCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbnlCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbnlCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
