import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmoWalletListComponent } from './lmo-wallet-list.component';

describe('LmoWalletListComponent', () => {
  let component: LmoWalletListComponent;
  let fixture: ComponentFixture<LmoWalletListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmoWalletListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmoWalletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
