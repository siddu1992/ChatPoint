import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  activeUsers: any;
  nameList:any;
  users: any;
  color :any=[]
  constructor(public apiservice:ApiserviceService, public chatservice: ChatserveService, public router:Router){

   let user = JSON.parse(String(localStorage.getItem("userdetails")));
     this.userid = user.id;
    console.log("userid in users",user.id)
    this.active()

    this.chatservice.authenticate(this.userid);

  }







  ngOnInit(){

    this.apiservice.getuser().subscribe((resp:any)=>{
      this.filteruser = resp.user;
      this.users = this.filteruser
      console.log(resp);
       setInterval(()=>{

        this.chatservice.authenticate(this.userid);

       },1000*30)

   
  });




   

  
  }
  
 
active(){
  this.chatservice.ActiveUsersList().subscribe((activeusers: any) => {
    console.log("activeusers  ",activeusers);
if(this.filteruser){
    this.activeUsers=activeusers;
    for(let obj of this.filteruser){
      for(let act of this.activeUsers){
       if(obj._id==act){
        obj.active='1'
       }
      
     }
    console.log("filteruser",this.filteruser);
    }
  }
  });
  
}


  addtomycart(obj:any){
    
  }
  enter(userid:any,name:any){
    this.color =[];
    this.color[userid] ='#2d2d30';
    this.chatservice.joinRoom(userid);

    this.chatservice.sendMesstoUser({roomid:userid,roomname:name,type:1});


  }
  usernames(searchTerm: any) {
    console.log("userlist",searchTerm);

   this.users = this.filteruser.filter((search:any) => {
      return search.userName.toLowerCase().includes(searchTerm);

    });

  };
  

}
