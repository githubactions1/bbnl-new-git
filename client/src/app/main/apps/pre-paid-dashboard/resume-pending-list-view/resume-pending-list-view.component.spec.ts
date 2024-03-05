import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumePendingListViewComponent } from './resume-pending-list-view.component';

describe('ResumePendingListViewComponent', () => {
  let component: ResumePendingListViewComponent;
  let fixture: ComponentFixture<ResumePendingListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumePendingListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumePendingListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
