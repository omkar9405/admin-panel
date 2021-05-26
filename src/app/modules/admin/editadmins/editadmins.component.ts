import { EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminsService } from 'src/app/_services/admins.service';

@Component({
  selector: 'app-editadmins',
  templateUrl: './editadmins.component.html',
  styleUrls: ['./editadmins.component.css']
})
export class EditadminsComponent implements OnInit {
  adminDto={
  "name":"",
  "permissions":"",
  "username":"",
  "mobile":"",
  "email":"",
  "imagePath":"../assets/dp.png"
}
 @Input()  getid:String;
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
    console.log('Error while fetching data:editadmin');
    console.error(err);
  });
 }

 update() {
  this.submitted = true;
      this.loading = true;
      
  this.authenticationService.update(this.adminDto,this.id).subscribe(
    (data:any) => {
      console.log(data);
      console.log(this.adminDto);
      this.submitted = false;
      this.loading = false;
      alert("Updated Successfully");
      
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
