import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditadminsComponent } from './editadmins.component';

describe('EditadminsComponent', () => {
  let component: EditadminsComponent;
  let fixture: ComponentFixture<EditadminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditadminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditadminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
