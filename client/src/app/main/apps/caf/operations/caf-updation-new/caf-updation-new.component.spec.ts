import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CafUpdationNewComponent } from './caf-updation-new.component';

describe('CafUpdationNewComponent', () => {
  let component: CafUpdationNewComponent;
  let fixture: ComponentFixture<CafUpdationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CafUpdationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafUpdationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
