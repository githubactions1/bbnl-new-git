import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCafComponent } from './individual-caf.component';

describe('IndividualCafComponent', () => {
  let component: IndividualCafComponent;
  let fixture: ComponentFixture<IndividualCafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualCafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualCafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
