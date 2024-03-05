import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialAssignmentDtlComponent } from './tutorial-assignment-dtl.component';

describe('TutorialAssignmentDtlComponent', () => {
  let component: TutorialAssignmentDtlComponent;
  let fixture: ComponentFixture<TutorialAssignmentDtlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialAssignmentDtlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialAssignmentDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
