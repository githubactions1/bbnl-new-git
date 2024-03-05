import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialBatchEdtComponent } from './tutorial-batch-edt.component';

describe('TutorialBatchEdtComponent', () => {
  let component: TutorialBatchEdtComponent;
  let fixture: ComponentFixture<TutorialBatchEdtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialBatchEdtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialBatchEdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
