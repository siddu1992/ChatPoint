import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Component, Inject, Optional } from '@angular/core';
import { ApiserviceService } from 'src/app/service/apiservice.service';
import { ChatserveService } from 'src/app/service/chatserve.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {}
  userlist: any;
  roomid: any;
  constructor(public dialogRef: MatDialogRef<AddUsersComponent>,
   @Optional() @Inject(MAT_DIALOG_DATA) public data: any,public apiservice:ApiserviceService,
   public chatservice:ChatserveService) {
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'userName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.apiservice.getuser().subscribe((resp:any)=>{
      let participants= data.participants;  //existing group members
      this.userlist = resp.user;   //all group members
      for(let obj of this.userlist){
        for(let part of participants){
            if(obj._id==part._id){
            obj.isDisabled =true;
            obj.userName = obj.userName +"(user already exists in group)"
            }
        }
      }
      console.log(resp);
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
addMeberTogroup(){
  this.chatservice.addMeberTogroup(this.data.roomid,this.selectedItems).subscribe((res:any)=>{
    this.selectedItems=[]
alert("users added success");
  },(err:any)=>{

  })
}
}
