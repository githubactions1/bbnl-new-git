import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialBatchComponent } from './tutorial-batch.component';

describe('TutorialBatchComponent', () => {
  let component: TutorialBatchComponent;
  let fixture: ComponentFixture<TutorialBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
