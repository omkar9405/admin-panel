import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeprofileComponent } from './employeeprofile.component';

describe('EmployeeprofileComponent', () => {
  let component: EmployeeprofileComponent;
  let fixture: ComponentFixture<EmployeeprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
