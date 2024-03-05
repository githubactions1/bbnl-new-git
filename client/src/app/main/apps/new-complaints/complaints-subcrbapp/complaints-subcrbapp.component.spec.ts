import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsSubcrbappComponent } from './complaints-subcrbapp.component';

describe('ComplaintsSubcrbappComponent', () => {
  let component: ComplaintsSubcrbappComponent;
  let fixture: ComponentFixture<ComplaintsSubcrbappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsSubcrbappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsSubcrbappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
