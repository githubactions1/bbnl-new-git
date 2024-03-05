import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmoCreditWalletListComponent } from './lmo-credit-wallet-list.component';

describe('LmoCreditWalletListComponent', () => {
  let component: LmoCreditWalletListComponent;
  let fixture: ComponentFixture<LmoCreditWalletListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmoCreditWalletListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmoCreditWalletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
