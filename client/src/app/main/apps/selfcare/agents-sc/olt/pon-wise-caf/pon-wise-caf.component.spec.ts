import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PonWiseCafComponent } from './pon-wise-caf.component';

describe('PonWiseCafComponent', () => {
  let component: PonWiseCafComponent;
  let fixture: ComponentFixture<PonWiseCafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PonWiseCafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PonWiseCafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
