import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { async } from 'rxjs';
import { ChatserveService } from 'src/app/service/chatserve.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit{
  msg:any=[];
  imageSrc:any;
  imageresult: any;
  bytes: any;
  imagesUlr:any="http://192.168.1.2:4000/images/"
  roomid: any;
  imgbox :any;
  typebox :any;
  

constructor(public chatservice:ChatserveService, public router:Router){}
messdis: any;
  displaymes :any;

    ngOnInit() {
      this.allBOxmessages();
      this.join();
      this.allNewMessage();


      this.chatservice.chattoUserList.subscribe((mesval:any)=>{
        this.messdis = mesval.roomname;
        this.roomid = mesval.roomid;
        this.msg = []
        this.allBOxmessages();


      })
    }
  
  

    sendMessage(msg:any) {
if(this.bytes==undefined){
  this.bytes=[],
  this.bytes["name"]=""
}


      this.chatservice.sendMesaage(this.roomid,msg,this.bytes,this.bytes["name"]).subscribe(res=>{
console.log("res----",res)
this.bytes=[],
this.bytes["name"]=""
this.typebox = ""
this.imgbox = ""
      },(err:any)=>{
console.log(err)
      });

     // this.chatservice.sendMesstoUser(msg);
     // console.log(msg)
     // this.router.navigateByUrl('/chatusers')

  
    }

    allNewMessage() {

      this.chatservice.allNewMessage().subscribe((res:any)=>{
if(!this.msg.includes(res)){

     this.msg.push(res)

  

}
console.log("res----",res)
      },(err:any)=>{
console.log(err)
      });
  
    }


    


    join(){
      this.chatservice.joinRoom(this.roomid)
    }


    allBOxmessages() {

      let userId=JSON.parse(String(localStorage.getItem("userdetails"))).id
      this.chatservice.getAllboxMesages(this.roomid,userId).subscribe((res:any)=>{
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



    onFileChange(event:any) {
      const reader = new FileReader();
      
      if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        this.bytes=event.target.files[0]
        reader.readAsDataURL(file);
      
        reader.onload = () => {
          this.imageresult=reader.result
          //this.bytes = new Uint8Array(this.imageresult);
          console.log("bytes",this.bytes["name"])
         this.imageSrc = reader.result as string;
         
     
        };
     
      }
    }

}
