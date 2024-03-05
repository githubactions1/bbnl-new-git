import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingLedgerComponent } from './accounting-ledger.component';

describe('AccountingLedgerComponent', () => {
  let component: AccountingLedgerComponent;
  let fixture: ComponentFixture<AccountingLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
