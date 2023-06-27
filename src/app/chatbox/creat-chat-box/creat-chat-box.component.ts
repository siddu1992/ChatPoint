import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ChatserveService } from 'src/app/service/chatserve.service';

@Component({
  selector: 'app-creat-chat-box',
  templateUrl: './creat-chat-box.component.html',
  styleUrls: ['./creat-chat-box.component.scss']
})
export class CreatChatBoxComponent implements OnInit{
  displayname :any;
  allboxs: any;
constructor(public chatservice:ChatserveService,public route:Router){}

  ngOnInit() {
    this.allchatbox();
  }

  createname(name:any) {

    this.displayname = name;
   
      this.chatservice.saveChatroom({name:name}).subscribe((res:any)=>{
       localStorage.setItem("chatboxname",name)
        // this.route.navigateByUrl("/chatbox");
  
      },
      (error:any)=>{
          alert("chat room aleardy exists")  
      });

    
  }

  allchatbox() {

    this.displayname = name
   
      this.chatservice.getAllchatrooms().subscribe((res:any)=>{
        this.allboxs=res;
      },
      (error:any)=>{
         alert("chat room aleardy exists")  
      }
      );
    
  }
  enter(roomid:any,name:any){
    
    this.chatservice.joinRoom(roomid);

    this.chatservice.sendMesstoUser({roomid:roomid,roomname:name});


  }

  
  }
  
