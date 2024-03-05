import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayComplaintsComponent } from './today-complaints.component';

describe('TodayComplaintsComponent', () => {
  let component: TodayComplaintsComponent;
  let fixture: ComponentFixture<TodayComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
