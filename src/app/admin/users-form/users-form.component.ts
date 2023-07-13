import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/service/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit{
  preview: string = '';
  userroles:any;
  token: any;
  userdetails: any;
  id: any;
  
 

  userForm = new FormGroup({
    userName: new FormControl('',[Validators.required]),
 //   userId: new FormControl('',[Validators.required]),
    useremail: new FormControl('',[Validators.required,Validators.email]),
    userrole: new FormControl(''),
  //  createdby: new FormControl(''),
    userpassword:new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')],
    ),
  //  userlocation: new FormControl('',[Validators.required])
  });

  constructor(public apiservice: ApiserviceService, public route: Router){
    
  }

  ngOnInit() {
    // this.token =localStorage.getItem("mytoken");
    // this.userdetails=localStorage.getItem("userdetails");
    // this.id = JSON.parse(this.userdetails).id;
   // this.userForm.value.createdby= this.id;

  //  console.log(this.userForm.value.createdby);

    this.userroles =[{name:"User",value:"user"},{name:"Admin",value:"admin"},{name:"Staff", value:"staff"}]
  }
  save() {
    this.userForm.value.userrole="user";
  //  this.userForm.value.createdby=this.id;

    this.apiservice.saveuser(this.userForm.value).subscribe(response =>{
      console.log("response",response);
      Swal.fire("user saved successfully");
      this.userForm.reset();
      this.route.navigateByUrl("/login")

      
    }, (error)=>{
      Swal.fire("email already exist")
    }
    )
    
    // this.preview = JSON.stringify(this.productForm.value);
  }
  
}
