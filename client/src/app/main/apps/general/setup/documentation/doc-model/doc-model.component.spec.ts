import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocModelComponent } from './doc-model.component';

describe('DocModelComponent', () => {
  let component: DocModelComponent;
  let fixture: ComponentFixture<DocModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
