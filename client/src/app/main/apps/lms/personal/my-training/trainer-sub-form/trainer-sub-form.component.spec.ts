import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerSubFormComponent } from './trainer-sub-form.component';

describe('TrainerSubFormComponent', () => {
  let component: TrainerSubFormComponent;
  let fixture: ComponentFixture<TrainerSubFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerSubFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerSubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
