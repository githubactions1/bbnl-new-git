import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialBatchDtlComponent } from './tutorial-batch-dtl.component';

describe('TutorialBatchDtlComponent', () => {
  let component: TutorialBatchDtlComponent;
  let fixture: ComponentFixture<TutorialBatchDtlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialBatchDtlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialBatchDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
