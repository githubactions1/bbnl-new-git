import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialVenueFormComponent } from './tutorial-venue-form.component';

describe('TutorialVenueFormComponent', () => {
  let component: TutorialVenueFormComponent;
  let fixture: ComponentFixture<TutorialVenueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialVenueFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialVenueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
