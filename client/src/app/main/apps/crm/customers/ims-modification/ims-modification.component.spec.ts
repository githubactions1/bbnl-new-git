import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsModificationComponent } from './ims-modification.component';

describe('ImsModificationComponent', () => {
  let component: ImsModificationComponent;
  let fixture: ComponentFixture<ImsModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImsModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
