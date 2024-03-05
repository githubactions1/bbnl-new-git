import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveComplaintsComponent } from './resolve-complaints.component';

describe('ResolveComplaintsComponent', () => {
  let component: ResolveComplaintsComponent;
  let fixture: ComponentFixture<ResolveComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
