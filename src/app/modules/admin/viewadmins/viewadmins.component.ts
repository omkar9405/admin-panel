import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminsService } from 'src/app/_services/admins.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-viewadmins',
  templateUrl: './viewadmins.component.html',
  styleUrls: ['./viewadmins.component.css']
})
export class ViewadminsComponent implements OnInit {
  adminDto={
    "name":"",
    "permissions":"",
    "username":"",
    "mobile":"",
    "email":"",
    "imagePath":"../assets/dp.png"
  }
  signupForm: FormGroup;
  id='';
  imageURL:string;
  loading = false;
  submitted = false;
  returnUrl: string;
   error = '';
  
    constructor(private route: ActivatedRoute,  private location: Location,
      private formBuilder: FormBuilder,private authenticationService: AdminsService) { 
      
    }
  
    ngOnInit(): void {
      this.signupForm = this.formBuilder.group({
        name:['',Validators.required],
        username:['',Validators.required],
        mobile:['',Validators.required],
        email: ['', Validators.required],
        permissions: ['',Validators.required],
        imagePath: [null]
    });
    this.id=this.route.snapshot.params['id'];
      console.log(this.id);
    this.getAdmin(this.id);
    }
  
    get f() { return this.signupForm.controls; }
  
    getAdmin(id)
   {
    this.authenticationService.getById(id).subscribe((res: any) => {
    this.adminDto.name=res.name;
    this.adminDto.username=res.username;
    this.adminDto.mobile=res.mobile;
    this.adminDto.email=res.email;
    this.adminDto.permissions=res.permissions;
    this.adminDto.imagePath=res.imagePath;  
    if(this.adminDto.imagePath=="https://justdialapi.herokuapp.com/images/undefined" || this.adminDto.imagePath==null )
    {
      this.imageURL="../assets/dp.png";
    }
    else
    {
      this.imageURL=this.adminDto.imagePath;
    }  
    }, (err) => {
      console.log('Error while fetching data:viewadmin');
      console.error(err);
    });
   }
  
   back()
   { 
     this.location.back();
   }
}
