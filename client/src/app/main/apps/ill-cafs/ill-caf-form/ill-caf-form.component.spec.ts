import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllCafFormComponent } from './ill-caf-form.component';

describe('IllCafFormComponent', () => {
  let component: IllCafFormComponent;
  let fixture: ComponentFixture<IllCafFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllCafFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllCafFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
