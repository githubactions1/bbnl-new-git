import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadWorkOrderComponent } from './bulk-upload-work-order.component';

describe('BulkUploadWorkOrderComponent', () => {
  let component: BulkUploadWorkOrderComponent;
  let fixture: ComponentFixture<BulkUploadWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkUploadWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUploadWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
