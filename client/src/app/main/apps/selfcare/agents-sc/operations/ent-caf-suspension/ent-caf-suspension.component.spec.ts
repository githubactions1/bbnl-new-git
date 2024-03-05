import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntCafSuspensionComponent } from './ent-caf-suspension.component';

describe('EntCafSuspensionComponent', () => {
  let component: EntCafSuspensionComponent;
  let fixture: ComponentFixture<EntCafSuspensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntCafSuspensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntCafSuspensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
