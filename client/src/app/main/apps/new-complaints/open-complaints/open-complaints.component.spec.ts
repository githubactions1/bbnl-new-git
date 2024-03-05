import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenComplaintsComponent } from './open-complaints.component';

describe('OpenComplaintsComponent', () => {
  let component: OpenComplaintsComponent;
  let fixture: ComponentFixture<OpenComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
