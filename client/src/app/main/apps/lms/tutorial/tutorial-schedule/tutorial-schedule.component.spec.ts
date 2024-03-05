import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialScheduleComponent } from './tutorial-schedule.component';

describe('TutorialScheduleComponent', () => {
  let component: TutorialScheduleComponent;
  let fixture: ComponentFixture<TutorialScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
