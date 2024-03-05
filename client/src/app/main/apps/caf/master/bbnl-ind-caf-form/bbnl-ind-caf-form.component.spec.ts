import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BbnlIndCafFormComponent } from './bbnl-ind-caf-form.component';

describe('BbnlIndCafFormComponent', () => {
  let component: BbnlIndCafFormComponent;
  let fixture: ComponentFixture<BbnlIndCafFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbnlIndCafFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbnlIndCafFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
