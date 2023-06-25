import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/service/apiservice.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit{
  userlist: any;
  displayStyle = "none";
  preview: string = '';
  userlists:any;

  userForm = new FormGroup({
    _id: new FormControl(''),
    userName: new FormControl('',[Validators.required]),
    userId: new FormControl('',[Validators.required]),
    useremail: new FormControl('',[Validators.required]),
    userlocation: new FormControl('',[Validators.required])
  });
 
  
  constructor(public apiservice:ApiserviceService) {}
  ngOnInit(){
    this.apiservice.getuser().subscribe(res=>{
      this.userlist = res.user;
      this.userlists = this.userlist
      });
      
  }
  conformdel(id:any){
    let s = confirm("confirm to delete");
    if(s==true){
      this.deletepro(id);
    }
    
  }
  deletepro(id:any) {
    this.apiservice.deluser(id).subscribe(res=>{
      alert (res.message);
      this.ngOnInit();
    })
  }

  openPopup(obj:any) {
    this.displayStyle = "block";
    this.userForm.patchValue(obj);
  }
  closePopup() {
    this.displayStyle = "none";
  }


  update() {
    this.apiservice.updateuser(this.userForm.value).subscribe(response =>{
      console.log("response",response);
      alert("user updated successfully");
      this.userForm.reset();
      this.ngOnInit();
      this.closePopup();
    })
  }
  userlis(e:any){
    this.userlists = this.userlist.filter((obj:any)=>{
      return obj.userName.toLowerCase().includes(e.target.value);
    })
  }

}
