import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordCustomerComponent } from './forgotpassword-customer.component';

describe('ForgotpasswordCustomerComponent', () => {
  let component: ForgotpasswordCustomerComponent;
  let fixture: ComponentFixture<ForgotpasswordCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpasswordCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
