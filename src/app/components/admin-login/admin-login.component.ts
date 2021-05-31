import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { AdminsService } from '../../_services/admins.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

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
    private authenticationService: AdminsService
  ) {
    if (this.authenticationService.currentAdminValue) { 
      this.router.navigate(['/app']);
  }
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/app/dashboard';
  }
  get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.error='';
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .subscribe(
                data => {
                    alert("Login Successful..");
                    console.log(localStorage.getItem('Token'));
                    this.router.navigate(['/app']);
                   
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }

}
