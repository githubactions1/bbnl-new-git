import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendPendingListViewComponent } from './suspend-pending-list-view.component';

describe('SuspendPendingListViewComponent', () => {
  let component: SuspendPendingListViewComponent;
  let fixture: ComponentFixture<SuspendPendingListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspendPendingListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendPendingListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
