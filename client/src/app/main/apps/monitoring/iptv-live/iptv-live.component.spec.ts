import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IptvLiveComponent } from './iptv-live.component';

describe('IptvLiveComponent', () => {
  let component: IptvLiveComponent;
  let fixture: ComponentFixture<IptvLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IptvLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IptvLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
