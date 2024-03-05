import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialEdtComponent } from './tutorial-edt.component';

describe('TutorialEdtComponent', () => {
  let component: TutorialEdtComponent;
  let fixture: ComponentFixture<TutorialEdtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialEdtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialEdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
