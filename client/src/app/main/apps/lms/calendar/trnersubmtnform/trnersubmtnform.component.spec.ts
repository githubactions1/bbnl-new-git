import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnersubmtnformComponent } from './trnersubmtnform.component';

describe('TrnersubmtnformComponent', () => {
  let component: TrnersubmtnformComponent;
  let fixture: ComponentFixture<TrnersubmtnformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrnersubmtnformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrnersubmtnformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
