import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HfooterComponent } from './hfooter.component';

describe('HfooterComponent', () => {
  let component: HfooterComponent;
  let fixture: ComponentFixture<HfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
