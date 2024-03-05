import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDetailsViewComponent } from './message-details-view.component';

describe('MessageDetailsViewComponent', () => {
  let component: MessageDetailsViewComponent;
  let fixture: ComponentFixture<MessageDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
