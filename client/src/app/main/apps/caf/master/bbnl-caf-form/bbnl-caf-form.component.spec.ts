import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BbnlCafFormComponent } from './bbnl-caf-form.component';

describe('BbnlCafFormComponent', () => {
  let component: BbnlCafFormComponent;
  let fixture: ComponentFixture<BbnlCafFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbnlCafFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbnlCafFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
