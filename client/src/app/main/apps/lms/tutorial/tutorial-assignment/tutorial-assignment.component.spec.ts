import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialAssignmentComponent } from './tutorial-assignment.component';

describe('TutorialAssignmentComponent', () => {
  let component: TutorialAssignmentComponent;
  let fixture: ComponentFixture<TutorialAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
