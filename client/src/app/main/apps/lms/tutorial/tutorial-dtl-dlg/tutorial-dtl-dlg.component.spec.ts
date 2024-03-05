import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialDtlDlgComponent } from './tutorial-dtl-dlg.component';

describe('TutorialDtlDlgComponent', () => {
  let component: TutorialDtlDlgComponent;
  let fixture: ComponentFixture<TutorialDtlDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialDtlDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialDtlDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
