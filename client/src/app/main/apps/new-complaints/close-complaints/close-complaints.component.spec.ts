import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseComplaintsComponent } from './close-complaints.component';

describe('CloseComplaintsComponent', () => {
  let component: CloseComplaintsComponent;
  let fixture: ComponentFixture<CloseComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
