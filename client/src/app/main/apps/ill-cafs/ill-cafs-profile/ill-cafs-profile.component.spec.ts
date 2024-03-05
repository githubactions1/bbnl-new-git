import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllCafsProfileComponent } from './ill-cafs-profile.component';

describe('IllCafsProfileComponent', () => {
  let component: IllCafsProfileComponent;
  let fixture: ComponentFixture<IllCafsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllCafsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllCafsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
