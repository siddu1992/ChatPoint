import { Component, OnInit } from '@angular/core';
import { ChatserveService } from 'src/app/service/chatserve.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit{
  msg:any=[];

constructor(public chatservice:ChatserveService){}
  
  displaymes :any;

    ngOnInit() {
      this.allBOxmessages();
      this.join();
      this.allNewMessage();
    }
  
    sendmess(mes:any) {
      let room_id= localStorage.getItem("room_id");
      this.displaymes = mes;
      this.chatservice.sendMessage({ room_id, mes })
  
    }

    getNewMessage(msg:any) {

      let room_id= localStorage.getItem("room_id");
      this.chatservice.getNewMessage(room_id,msg).subscribe(res=>{
console.log("res----",res)
this.allNewMessage();
      },(err:any)=>{
console.log(err)
      });
  
    }

    allNewMessage() {

      let room_id= localStorage.getItem("room_id");
      this.chatservice.allNewMessage().subscribe(res=>{
if(!this.msg.includes(res)){
  this.msg.push(res);

}
console.log("res----",res)
      },(err:any)=>{
console.log(err)
      });
  
    }


    


    join(){
    let room_id= localStorage.getItem("room_id");
      this.chatservice.joinRoom(room_id)
    }


    allBOxmessages() {

      let room_id= localStorage.getItem("room_id");
      let userId=JSON.parse(String(localStorage.getItem("userdetails"))).id
      this.chatservice.getAllboxMesages(room_id,userId).subscribe((res:any)=>{
        console.log("resalll",res);
        for(let obj of res)
        {
          if(!this.msg.includes(obj)){
            this.msg.push(obj);
          
          }
          console.log("res----",res)
        }

      },(err:any)=>{
console.log(err)
      });
  
    }

}
