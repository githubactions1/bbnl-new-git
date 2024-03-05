import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousdayComplaintsComponent } from './previousday-complaints.component';

describe('PreviousdayComplaintsComponent', () => {
  let component: PreviousdayComplaintsComponent;
  let fixture: ComponentFixture<PreviousdayComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousdayComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousdayComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
