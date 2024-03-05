import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkResumeComponent } from './bulk-resume.component';

describe('BulkResumeComponent', () => {
  let component: BulkResumeComponent;
  let fixture: ComponentFixture<BulkResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
