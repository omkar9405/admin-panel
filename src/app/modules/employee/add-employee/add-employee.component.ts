import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  public employeeForm: FormGroup;
  constructor(private location: Location) { }
  ngOnInit() {
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      type: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl(new Date()),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.employeeForm.controls[controlName].hasError(errorName);
  }
  public onCancel = () => {
    this.location.back();
  }
  public createOwner = (employeeFormValue) => {
    if (this.employeeForm.valid) {
      this.executeOwnerCreation(employeeFormValue);
    }
  }
  private executeOwnerCreation = (employeeFormValue) => {
   
  }

}
