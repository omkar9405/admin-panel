import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    success='';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentCustomerValue) { 
            this.router.navigate(['/customerProfile']);
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
                    console.log(localStorage.getItem('CustomerToken'));
                    this.router.navigate(['/customerProfile']);
                   
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
    
    forgotPassword(){
        this.router.navigate(['forgotPassword'],{relativeTo:this.route});
    }
}
