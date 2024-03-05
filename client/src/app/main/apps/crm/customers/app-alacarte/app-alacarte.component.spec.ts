import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAlacarteComponent } from './app-alacarte.component';

describe('AppAlacarteComponent', () => {
  let component: AppAlacarteComponent;
  let fixture: ComponentFixture<AppAlacarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAlacarteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAlacarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
