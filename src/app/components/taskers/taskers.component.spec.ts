import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskersComponent } from './taskers.component';

describe('TaskersComponent', () => {
  let component: TaskersComponent;
  let fixture: ComponentFixture<TaskersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
