import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualFingerPrintComponent } from './individual-finger-print.component';

describe('IndividualFingerPrintComponent', () => {
  let component: IndividualFingerPrintComponent;
  let fixture: ComponentFixture<IndividualFingerPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualFingerPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualFingerPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
