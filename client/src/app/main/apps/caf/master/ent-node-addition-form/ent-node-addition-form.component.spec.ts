import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntNodeAdditionFormComponent } from './ent-node-addition-form.component';

describe('EntNodeAdditionFormComponent', () => {
  let component: EntNodeAdditionFormComponent;
  let fixture: ComponentFixture<EntNodeAdditionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntNodeAdditionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntNodeAdditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
