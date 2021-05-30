import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminsService } from 'src/app/_services/admins.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-newadmin',
  templateUrl: './newadmin.component.html',
  styleUrls: ['./newadmin.component.css']
})
export class NewadminComponent implements OnInit {
  adminDto={
    "name":"",
    "permissions":"",
    "username":"",
    "mobile":"",
    "email":"",
    "imagePath":"../assets/dp.png",
    "password":""
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
        password:['',Validators.required],
        imagePath: [null]
    });
    this.id=this.route.snapshot.params['id'];
      console.log(this.id);
      if(this.imageURL==null)
      {
        this.imageURL="../assets/dp.png"
      }
    }
  
    get f() { return this.signupForm.controls; }
  
   save() {
    this.submitted = true;
        this.loading = true;
        
    this.authenticationService.save(this.adminDto).subscribe(
      (data:any) => {
        console.log(data);
        console.log(this.adminDto);
        this.submitted = false;
        this.loading = false;
        alert("Saved Successfully");
        this.location.back();
    },(err) => {
        alert(err);
        this.error=err;
        this.loading =false;
    });
  }
  
   back()
   { 
     this.location.back();
   }
  
  
   showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({
      imagePath: file
    });
    this.signupForm.get('imagePath').updateValueAndValidity()
  
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      this.adminDto.imagePath=this.imageURL;
    }
    reader.readAsDataURL(file)
  }
  
}
