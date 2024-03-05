import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePackListComponent } from './base-pack-list.component';

describe('BasePackListComponent', () => {
  let component: BasePackListComponent;
  let fixture: ComponentFixture<BasePackListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasePackListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
