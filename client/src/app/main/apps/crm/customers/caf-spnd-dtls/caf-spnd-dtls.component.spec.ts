import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CafSpndDtlsComponent } from './caf-spnd-dtls.component';

describe('CafSpndDtlsComponent', () => {
  let component: CafSpndDtlsComponent;
  let fixture: ComponentFixture<CafSpndDtlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CafSpndDtlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafSpndDtlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
