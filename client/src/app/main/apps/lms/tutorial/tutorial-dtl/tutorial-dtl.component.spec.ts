import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialDtlComponent } from './tutorial-dtl.component';

describe('TutorialDtlComponent', () => {
  let component: TutorialDtlComponent;
  let fixture: ComponentFixture<TutorialDtlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialDtlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
