import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { async } from 'rxjs';
import { ChatserveService } from 'src/app/service/chatserve.service';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { Emoji } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { Popover } from 'bootstrap';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as bootstrap from 'bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],


})
export class ChatBoxComponent implements OnInit{
  @ViewChild('target') contentRef!: ElementRef<HTMLInputElement>;
  @ViewChild('template') templateRef!: TemplateRef<any>;

  contentHeight:any;

  msg:any=[];
  imageSrc:any='';
  imageresult: any;
  bytes: any;
  imagesUlr:any="http://192.168.1.6:4000/images/"
  roomid: any;
  imgbox :any;
  typebox :any='';
  logInuserId:any;
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger',
  ];
  set: Emoji['set'] = 'apple';
  emoji: boolean=false;
  type: any;
  loggedInName: any;
constructor(public chatservice:ChatserveService, public router:Router,private modalService: NgbModal){
  let user = JSON.parse(String(localStorage.getItem("userdetails")));
  this.loggedInName=user.Name;
  this.logInuserId = user.id;
 console.log("users",user.id)

}
roomname: any;
  displaymes :any;

    ngOnInit() {
  
      

     //// this.scrollToElement();        


      this.chatservice.chattoUserList.subscribe((mesval:any)=>{
        this.roomname = mesval.roomname;
        this.roomid = mesval.roomid;
        this.type=mesval.type;
        console.log("this.type=",this.type)
        this.msg = []
        if( this.type==1){
          this.chatservice.authenticate(this.logInuserId);

          this.chatservice.receiveindividualMsg().subscribe((res: any) => {
            // Handle received messages
            if(!this.msg.includes(res)){

              this.msg.push(res)
         
            }
            console.log('Received Message:', res);
          });
        }
        if( this.type==2){
          this.allBOxmessages();
          this.join();
          this.allNewMessage();
        }


      })
    }
   


  

    sendMessage(msg:any) {
if(this.bytes==undefined){
  this.bytes=[],
  this.bytes["name"]=""
}

if(this.type==1){
      // individual message

  this.chatservice.sendindividualMsg( this.roomid , msg)
  this.msg.push({  message:this.typebox , userName:this.loggedInName, userId:this.roomid,fileName:this.imageSrc})
  this.chatservice.receiveindividualMsg().subscribe((res: any) => {
    // Handle received messages
    if(!this.msg.includes(res)){

      this.msg.push(res)
 
    }
    console.log('Received Message:', res);
  });

this.bytes=[],
this.bytes["name"]=""
this.typebox = ""
this.imgbox = ""
}
else{
      // Group message

      this.chatservice.sendMesaage(this.roomid,msg,this.bytes,this.bytes["name"]).subscribe((res:any)=>{
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
        setTimeout(()=>{
          this.ngAfterViewChecked()

        },200)

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
  
    ngAfterViewChecked(){
      var test = this.contentHeight != this.contentRef.nativeElement.scrollHeight 
        //&& this.contentRef.nativeElement.scrollHeight != (this.contentRef.nativeElement.scrollTop + this.contentRef.nativeElement.offsetHeight);
      console.log(test);
  
      if (this.contentHeight != this.contentRef.nativeElement.scrollHeight && this.contentRef.nativeElement.scrollHeight != (this.contentRef.nativeElement.scrollTop + this.contentRef.nativeElement.offsetHeight)){
        this.contentRef.nativeElement.scrollTo(0, this.contentRef.nativeElement.scrollHeight);
      }
    }
    addEmoji(event:any){
    const { typebox } = this;
    console.log(typebox);
    console.log(`${event.emoji.native}`)
    const text = `${typebox}${event.emoji.native}`;

    this.typebox = text;
    }
    openEmoji(){
      this.showEmojiPicker =! this.showEmojiPicker ;
      this.modalService.open(this.templateRef,{windowClass:'model'});

    }
onFocus() {
  this.showEmojiPicker = false;
}
    
}
