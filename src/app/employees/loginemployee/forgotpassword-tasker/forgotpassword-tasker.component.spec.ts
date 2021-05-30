import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordTaskerComponent } from './forgotpassword-tasker.component';

describe('ForgotpasswordTaskerComponent', () => {
  let component: ForgotpasswordTaskerComponent;
  let fixture: ComponentFixture<ForgotpasswordTaskerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpasswordTaskerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordTaskerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
