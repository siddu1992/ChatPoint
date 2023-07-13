import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AddUsersComponent } from 'src/app/models/add-users/add-users.component';
import { ApiserviceService } from 'src/app/service/apiservice.service';
import { ChatserveService } from 'src/app/service/chatserve.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creat-chat-box',
  templateUrl: './creat-chat-box.component.html',
  styleUrls: ['./creat-chat-box.component.scss']
})
export class CreatChatBoxComponent implements OnInit{
  displayname :any;
  allboxs: any;
  grouplist:any;
  color: any=[];
  filteruser :any;
  displayStyle:any;
  loggedInName: any;
  logInuserId: any;
  gname:any;

constructor(public chatservice:ChatserveService,public route:Router, public apiservice:ApiserviceService, private renderer: Renderer2){
  let user = JSON.parse(String(localStorage.getItem("userdetails")));
  this.loggedInName = user.Name;
  this.logInuserId = user.id;
}
  ngOnInit() {
    this.allchatbox();
   // this.color='red'
  }

  createname(name:any) {

    this.displayname = name;
   
      this.chatservice.saveChatroom({name:name,roomId:this.logInuserId,userName:this.loggedInName,role:"admin"}).subscribe((res:any)=>{
       localStorage.setItem("chatboxname",name)
        // this.route.navigateByUrl("/chatbox");
        this.gname="";
        this.allchatbox();
        Swal.fire("group created");
        


      },
      (error:any)=>{
        Swal.fire("chat room aleardy exists")  
      });

    
  }

  allchatbox() {

      let boxuser={_id:this.logInuserId,userName:this.loggedInName}
      this.chatservice.getAllchatrooms(boxuser).subscribe((res:any)=>{
        this.allboxs=res;
        this.grouplist = this.allboxs;
        this.unseen();
      },
      (error:any)=>{
        Swal.fire("server error")  
      }
      );
    
  }
  enter(roomid:any,name:any,participants:any){
    this.color=[];
    this.color[roomid]='#2d2d30'
this.updateseen(roomid)
this.chatservice.joinRoom(roomid);

    this.chatservice.sendMesstoUser({roomid:roomid,roomname:name,type:2,participants:participants});


  }

  usernames(searchTerm:any){
    console.log("grouplist",searchTerm)
    this.grouplist = this.allboxs.filter((search:any)=>{
      return search.name.toLowerCase().includes(searchTerm)
    });
  }

 


  add() {
    this.apiservice.getuser().subscribe((resp:any)=>{
      this.filteruser = resp.user;
      console.log("resp",resp);
      Swal.fire("user added successfully");
      
      this.ngOnInit();
    })
  }

  unseen(){
    this.chatservice.unseenMsg({_id:this.logInuserId}).subscribe((res:any)=>{
      let unseen=res;
      for(let obj of this.grouplist){
           for(let un of unseen){
            if(obj.name == un.chatroomName)
               obj.count=un.unseenCount;
           }
      }
    })
  }
  updateseen(roomid:any){
    this.chatservice.updateseen({_id:this.logInuserId,roomId:roomid}).subscribe((res:any)=>{
      let unseen=res;
      this.allchatbox();
    })
  }
  }
  
