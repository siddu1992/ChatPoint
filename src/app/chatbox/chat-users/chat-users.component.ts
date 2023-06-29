import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/service/apiservice.service';
import { ChatserveService } from 'src/app/service/chatserve.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements OnInit{
  filteruser: any;
  userid : any;
  constructor(public apiservice:ApiserviceService, public chatservice: ChatserveService){

   let user = JSON.parse(String(localStorage.getItem("userdetails")));
     this.userid = user.id;
    console.log("users",user.id)

  }







  ngOnInit(){
    this.apiservice.getuser().subscribe((resp:any)=>{
      this.filteruser = resp.user;
      console.log(resp);
  
    // Authenticate the user with their ID
    const userId = '123'; // Replace with the authenticated user's ID

    // Receive individual messages
   
  });

  }
  
 



  addtomycart(obj:any){
    
  }
  enter(userid:any,name:any){
    
    this.chatservice.joinRoom(userid);

    this.chatservice.sendMesstoUser({roomid:userid,roomname:name,type:1});


  }

}
