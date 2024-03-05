import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllCafPackagesComponent } from './ill-caf-packages.component';

describe('IllCafPackagesComponent', () => {
  let component: IllCafPackagesComponent;
  let fixture: ComponentFixture<IllCafPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllCafPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllCafPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
