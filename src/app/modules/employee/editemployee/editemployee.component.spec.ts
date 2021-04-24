import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditemployeeComponent } from './editemployee.component';

describe('EditemployeeComponent', () => {
  let component: EditemployeeComponent;
  let fixture: ComponentFixture<EditemployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditemployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
