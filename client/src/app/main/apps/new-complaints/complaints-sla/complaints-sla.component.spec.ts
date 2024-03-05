import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsSlaComponent } from './complaints-sla.component';

describe('ComplaintsSlaComponent', () => {
  let component: ComplaintsSlaComponent;
  let fixture: ComponentFixture<ComplaintsSlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintsSlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsSlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
