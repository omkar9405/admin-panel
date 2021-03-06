import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { TaskerService } from 'src/app/_services/tasker.service';


@Component({
  selector: 'app-loginemployee',
  templateUrl: './loginemployee.component.html',
  styleUrls: ['./loginemployee.component.css']
})
export class LoginemployeeComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  success='';
  status ={
      "active":true
  };
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: TaskerService,
    private _snackBar: MatSnackBar 
) { 
    // redirect to home if already logged in
    if (this.authenticationService.currentTaskerValue) { 
        this.router.navigate(['/employeeProfile']);
    }
}

ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
   // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customerProfle';
}
openSnackBar(message: string) {
    this._snackBar.open(message,'OK',{horizontalPosition: 'center',verticalPosition: 'top',duration: 3000});
  }

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.error='';
    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
        .subscribe(
            data => {
                this.openSnackBar("Login Successfull");
                console.log(localStorage.getItem('Token'));
                this.router.navigate(['/employeeProfile']);
                // this.loggedin();
                console.log(data);
            },
            error => {
                this.error = error.message;
                this.loading = false;
            });
}



forgotPassword(){
    this.router.navigate(['forgotPassword'],{relativeTo:this.route});
}

}
