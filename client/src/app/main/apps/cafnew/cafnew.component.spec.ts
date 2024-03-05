import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CafnewComponent } from './cafnew.component';

describe('CafnewComponent', () => {
  let component: CafnewComponent;
  let fixture: ComponentFixture<CafnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CafnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
