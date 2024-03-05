import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CafbulkformComponent } from './cafbulkform.component';

describe('CafbulkformComponent', () => {
  let component: CafbulkformComponent;
  let fixture: ComponentFixture<CafbulkformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CafbulkformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafbulkformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
