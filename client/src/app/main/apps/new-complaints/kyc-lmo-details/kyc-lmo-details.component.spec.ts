import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycLmoDetailsComponent } from './kyc-lmo-details.component';

describe('KycLmoDetailsComponent', () => {
  let component: KycLmoDetailsComponent;
  let fixture: ComponentFixture<KycLmoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycLmoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycLmoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
