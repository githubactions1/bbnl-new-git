import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntCafadditionFormComponent } from './ent-cafaddition-form.component';

describe('EntCafadditionFormComponent', () => {
  let component: EntCafadditionFormComponent;
  let fixture: ComponentFixture<EntCafadditionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntCafadditionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntCafadditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
