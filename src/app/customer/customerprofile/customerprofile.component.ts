import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';
import { CustomerService } from 'src/app/_services/customer.service';
@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.css']
})
export class CustomerprofileComponent implements OnInit {
tasker:[]
customerForm:FormGroup;
imageURL='';
loading = false;
submitted = false;   
id='';
error='';
username='';
customerDto = {
  "customername":"",
  "address":"",
  "imagePath":"",
  "pincode":0,
  "mobile": 0,
  "gender":"",
  "email": "",
  "dob":"",
  "password": ""
 }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private datatableservice: DatatableService, 
    private router: Router,
    private customerService:CustomerService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit( ): void {
    this.customerForm = this.formBuilder.group({
      customername:['',Validators.required],
      mobile:['',Validators.required],
      pincode:['',Validators.required],
      gender:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      dob:['',Validators.required],
      address:['',Validators.required],
      imagePath: [null]
  });
    this.datatableservice.initTable('customers');
    var customer=localStorage.getItem('currentCustomer');
    var json = JSON.parse(customer);
    var obj=json["customer"];
    this.id=obj["id"];
    this.username=obj["customername"];
    this.getCustomer();
   // this.id=localStorage.getItem('CurrentTasker');
  }

  getCustomer(){
    this.customerService.getById(this.id).subscribe((res: any) => {
      
      this.customerDto.customername = res.customername;
      this.customerDto.mobile = res.mobile;
      this.customerDto.pincode = res.pincode;
      this.customerDto.gender = res.gender;
      this.customerDto.email = res.email;
      this.customerDto.imagePath = res.imagePath;
      this.customerDto.dob = res.dob;   
      this.customerDto.password = res.password;
      this.customerDto.address = res.address;
      if(this.customerDto.imagePath=="")
    {
      this.imageURL="../assets/dp.png";
    }
    else
    {
      this.imageURL=this.customerDto.imagePath;
    }

      console.log(this.customerDto);

    }, (err) => {
      console.log('Error while fetching');
      console.error(err);
    });
    return this.customerDto;
   }

   update() {
        this.submitted = true;
        this.loading = true;
        
    this.customerService.update(this.customerDto,this.id).subscribe(
      (data:any) => {
        console.log(data);
        alert("Updated Successfully");
        this.loading=false;
    },(err) => {
        alert(err);
        this.error=err;
        this.loading =false;
    });
  }

   showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.customerForm.patchValue({
      imagePath: file
    });
    this.customerForm.get('imagePath').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      this.customerDto.imagePath=this.imageURL;
    }
    reader.readAsDataURL(file)
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/customerlogin']);
}
}
