import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../service/apiservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  userdetails: any;

  userForm = new FormGroup({
    useremail: new FormControl('',[Validators.required,Validators.email]),
    userpassword:new FormControl('',[Validators.required,  Validators.minLength(1)
   // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')
   ])
  });
  token: any;

  constructor(public apiservice:ApiserviceService, public route: Router){
  }
  ngOnInit() {
   
  }
  showPassword = false;
togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}
  userlogin(){
    this.apiservice.userlogin(this.userForm.value).subscribe((res:any)=>{
      this.userdetails = res.user;
      this.token = res.accessToken;
      localStorage.setItem("mytoken", this.token);
      localStorage.setItem("userdetails", JSON.stringify(this.userdetails));
      localStorage.setItem("loggedin","true");
      // this.route.navigateByUrl("/dashboard")
      this.route.navigateByUrl("/chatbox")

      console.log(this.token);

    },
    (error:any)=>{
      alert("invalid Email or password");
      localStorage.setItem("loggedin","false");

    }
    );
  }
}
