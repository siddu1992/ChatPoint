import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/service/apiservice.service';

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
    userId: new FormControl('',[Validators.required]),
    useremail: new FormControl('',[Validators.required]),
    userrole: new FormControl('',[Validators.required]),
    createdby: new FormControl(''),
    userpassword:new FormControl('',[Validators.required]),
    userlocation: new FormControl('',[Validators.required])
  });

  constructor(public apiservice: ApiserviceService){
    
  }

  ngOnInit() {
    this.token =localStorage.getItem("mytoken");
    this.userdetails=localStorage.getItem("userdetails");
    this.id = JSON.parse(this.userdetails).id;
   // this.userForm.value.createdby= this.id;

    console.log(this.userForm.value.createdby);

    this.userroles =[{name:"User",value:"user"},{name:"Admin",value:"admin"},{name:"Staff", value:"staff"}]
  }
  save() {
    this.userForm.value.createdby=this.id;
    this.apiservice.saveuser(this.userForm.value).subscribe(response =>{
      console.log("response",response);
      alert("user saved successfully");
      this.userForm.reset();
      
    }, (error)=>{
      alert("email already exist")
    }
    )
    
    // this.preview = JSON.stringify(this.productForm.value);
  }
  
}
