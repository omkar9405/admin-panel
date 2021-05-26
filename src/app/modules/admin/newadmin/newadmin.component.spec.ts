import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewadminComponent } from './newadmin.component';

describe('NewadminComponent', () => {
  let component: NewadminComponent;
  let fixture: ComponentFixture<NewadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
