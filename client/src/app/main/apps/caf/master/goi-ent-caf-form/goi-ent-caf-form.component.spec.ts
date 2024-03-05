import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoiEntCafFormComponent } from './goi-ent-caf-form.component';

describe('GoiEntCafFormComponent', () => {
  let component: GoiEntCafFormComponent;
  let fixture: ComponentFixture<GoiEntCafFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoiEntCafFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoiEntCafFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
