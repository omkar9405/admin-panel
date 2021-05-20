import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
      "active":false
  };
  id='';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: TaskerService
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
                alert("Login Successful..");
                this.status.active = true;
                console.log(localStorage.getItem('Token'));
                this.router.navigate(['/employeeProfile']);
                this.loggedin();
                console.log(data);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
}

loggedin()
{
    var tasker=localStorage.getItem('currentTasker');
    var json = JSON.parse(tasker);
    var obj=json["tasker"];
    var id=obj["id"];
    this.authenticationService.patch(this.status,id)
    .subscribe(
        data => {
            console.log("You are active now "+data);
        },
        err => {
            console.log(err);
            this.error = err;
            this.loading = false;
        });
}
}
