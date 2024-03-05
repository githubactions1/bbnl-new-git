import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymetWalletComponent } from './paymet-wallet.component';

describe('PaymetWalletComponent', () => {
  let component: PaymetWalletComponent;
  let fixture: ComponentFixture<PaymetWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymetWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymetWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
