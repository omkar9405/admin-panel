import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincustomerComponent } from './logincustomer.component';

describe('LogincustomerComponent', () => {
  let component: LogincustomerComponent;
  let fixture: ComponentFixture<LogincustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogincustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogincustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
