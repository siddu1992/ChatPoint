import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { async, filter, take } from 'rxjs';
import { ChatserveService } from 'src/app/service/chatserve.service';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { Emoji } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { Popover } from 'bootstrap';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as bootstrap from 'bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CompressImageService } from 'src/app/service/comptressImageService';
import { HeaderComponent } from 'src/app/header/header.component';
import { ChatUsersComponent } from '../chat-users/chat-users.component';
import { CreatChatBoxComponent } from '../creat-chat-box/creat-chat-box.component';
import { AddUsersComponent } from 'src/app/models/add-users/add-users.component';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';
import { ApiserviceService } from 'src/app/service/apiservice.service';
import { MatDialog } from '@angular/material/dialog';
import { GrpmembersComponent } from 'src/app/models/grpmembers/grpmembers.component';
import { ViewimageComponent } from 'src/app/models/viewimage/viewimage.component';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],


})
export class ChatBoxComponent implements OnInit {
  @ViewChild('target') contentRef!: ElementRef<HTMLInputElement>;
  @ViewChild('template') templateRef!: TemplateRef<any>;
  @ViewChild(CreatChatBoxComponent) create!:CreatChatBoxComponent

  contentHeight: any;

  msg: any = [];
  imageSrc: any = '';
  imageresult: any;
  bytes: any;
  imagesUlr: any = "http://192.168.1.4:4000/images/"
  roomid: any;
  imgbox: any;
  typebox: any = '';
  logInuserId: any;
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
  emoji: boolean = false;
  type: any;
  loggedInName: any;
  compressedImage: any;
  imgSrc: any;
  displayStyle: any;
  displayStyle1: any
  filteruser: any;
  roomname: any;
  displaymes: any;
  textBoxValue: any;
  initialTextAreaHeight: number = 20; // Set the initial height here


  @ViewChild('message-content') myDiv!: ElementRef;
  @ViewChild(ChatUsersComponent) nameList!: ChatUsersComponent;
  @ViewChild(CreatChatBoxComponent) groupList!: CreatChatBoxComponent;

  textBoxHeight: any;
  userlist: any;
  members: any = [];
  participants: any;
  displayStyleAllMembers: any;
  role:any
  constructor(public apiservice: ApiserviceService, public dialog: MatDialog, private compressImage: CompressImageService, public chatservice: ChatserveService, public router: Router, private modalService: NgbModal) {
    let user = JSON.parse(String(localStorage.getItem("userdetails")));
    this.loggedInName = user.Name;
    this.logInuserId = user.id;
    console.log("users", user.id)




  }


  adjustTextBoxHeight(event: any) {
    const textArea = event.target;
    textArea.style.height = 'auto';
    if (textArea.scrollHeight < this.initialTextAreaHeight) {
      textArea.style.height = this.initialTextAreaHeight + 'px';
      console.log("first", this.initialTextAreaHeight)
    } else {
      textArea.style.height = textArea.scrollHeight + 'px';
      console.log("middle", textArea.scrollHeight)

    }

    this.textBoxHeight = textArea.scrollHeight;
    console.log("last", this.textBoxHeight);



    // textArea.style.height = textArea.scrollHeight + 'px';
    // this.textBoxHeight = textArea.scrollHeight;
  }
  ngOnInit() {

    //// this.scrollToElement();        


    this.chatservice.chattoUserList.subscribe((mesval: any) => {
      this.roomname = mesval.roomname;
      this.roomid = mesval.roomid;
      this.type = mesval.type;
      this.participants = mesval.participants;
      
      console.log("this.type=", this.type)
   

      this.msg = []
      if (this.type == 1) {

        //this.ActiveUser()
        this.chatservice.receiveindividualMsg().subscribe((res: any) => {
          if (res.userId == this.roomid || res.userId == this.loggedInName) {
            // Handle received messages
            if (!this.msg.includes(res)) {

              this.msg.push(res)

            }
            console.log('Received Message ho ho:', res);
          }
        });
        this.individualChat()

      }
      if (this.type == 2) {
        let grpadmin =this.participants.filter((obj:any)=>{
          return obj.userName == this.loggedInName
  
        })
        console.log("groupname", grpadmin)
        this.role = grpadmin[0].role
        this.allBOxmessages();
        this.join();
        this.allNewMessage();
      }


    })


  }





  sendMessage(msg: any) {

    if (this.bytes == undefined) {
      this.bytes = [],
        this.bytes["name"] = ""
    }

    if (this.type == 1) {
      // individual message
      // this.ActiveUser();
      // setTimeout(()=>{
      //   this.getchatLogs()

      // },1000)

      this.chatservice.sendindividualMsg(this.logInuserId, this.roomid, msg, this.bytes, this.bytes["name"])
      setTimeout(() => {
        this.individualChat()

      }, 2000)
      // this.chatservice.receiveindividualMsg().subscribe((res: any) => {
      //   // Handle received messages
      //   if(!this.msg.includes(res)){

      //     this.msg.push(res)

      //   }
      //   console.log('Received Message:', res);
      // });

      this.bytes = [],
        this.bytes["name"] = ""
      this.typebox = ""
      this.imgbox = ""
    }
    else {
      // Group message

      this.chatservice.sendMesaage(this.roomid, msg, this.bytes, this.bytes["name"]).subscribe((res: any) => {
        console.log("res----", res)
        this.bytes = [],
          this.bytes["name"] = ""
        this.typebox = ""
        this.imgbox = ""
      }, (err: any) => {
        console.log(err)
      });

      // this.chatservice.sendMesstoUser(msg);
      // console.log(msg)
      // this.router.navigateByUrl('/chatusers')

    }
  }

  allNewMessage() {

    this.chatservice.allNewMessage().subscribe((res: any) => {
      this.create.updateseen(this.roomid);
      if (!this.msg.includes(res)) {

        this.msg.push(res)



      }
      console.log("res----", res)
    }, (err: any) => {
      console.log(err)
    });

  }


  join() {
    this.chatservice.joinRoom(this.roomid)
  }


  allBOxmessages() {

    let userId = JSON.parse(String(localStorage.getItem("userdetails"))).id
    this.chatservice.getAllboxMesages(this.roomid, userId).subscribe((res: any) => {
      console.log("resalll", res);
      for (let obj of res) {
        if (!this.msg.includes(obj)) {
          this.msg.push(obj);

        }
        console.log("res----", res)
      }
      setTimeout(() => {
        //this.ngAfterViewChecked()

      }, 200)

    }, (err: any) => {
      console.log(err)
    });

  }



  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.bytes = event.target.files[0];

      if (file) {
        console.log('this.bytes', "------", this.bytes);
        this.compress(event.target.files[0]);
      }
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageresult = reader.result
        //this.bytes = new Uint8Array(this.imageresult);
        console.log("bytes", this.bytes["name"])
        this.imageSrc = reader.result as string;


      };

    }
  }
  closeimg() {
    this.imageSrc = "";
    this.bytes = [],
      this.bytes["name"] = "";
  }
  compress(image: any) {
    console.log(`Image size before compressed: ${image.size} bytes.`)

    this.compressImage.compress(image)
      .pipe(take(1))
      .subscribe(compressedImage => {
        this.bytes = compressedImage;
        console.log(`Image size after compressed: ${compressedImage.size} bytes.`)
        // now you can do upload the compressed image 
      })
  }
  imgClick(url: any, fileName: any) {


    this.imgSrc = url + fileName;

    const dialogRef = this.dialog.open(ViewimageComponent,
      { data: { imgSrc: this.imgSrc }, width: '500px', height: "60vw" }
    );
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getroomdetails(this.roomid)
      console.log(`Dialog result: ${result}`);
    });
  }


  adduserPop() {

    const dialogRef = this.dialog.open(AddUsersComponent,
      { data: { roomid: this.roomid, participants: this.participants }, width: '450px', height: "400px" },

    );

    dialogRef.afterClosed().subscribe((result: any) => {

      this.getroomdetails(this.roomid)
      console.log(`Dialog result: ${result}`);
    });
  }

  getroomdetails(roomId: any) {
    this.chatservice.getChatroombyId(roomId).subscribe((res: any) => {
      this.participants = res[0].participants;
    })

  }

  // ngAfterViewChecked() {
  //   var test = this.contentHeight != this.contentRef.nativeElement.scrollHeight
  //   //&& this.contentRef.nativeElement.scrollHeight != (this.contentRef.nativeElement.scrollTop + this.contentRef.nativeElement.offsetHeight);
  //   console.log(test);

  //   if (this.contentHeight != this.contentRef.nativeElement.scrollHeight && this.contentRef.nativeElement.scrollHeight != (this.contentRef.nativeElement.scrollTop + this.contentRef.nativeElement.offsetHeight)) {
  //     this.contentRef.nativeElement.scrollTo(0, this.contentRef.nativeElement.scrollHeight);
  //   }
  // }
  addEmoji(event: any) {
    const { typebox } = this;
    console.log(typebox);
    console.log(`${event.emoji.native}`)
    const text = `${typebox}${event.emoji.native}`;

    this.typebox = text;
  }
  openEmoji() {
    this.showEmojiPicker = !this.showEmojiPicker;
    this.modalService.open(this.templateRef, { windowClass: 'model' });

  }
  onFocus() {
    this.showEmojiPicker = false;
  }
  Activechatlogs() {

    this.chatservice.Activechatlogs(this.logInuserId, this.roomid);
    //this.getchatLogs();

  }
  // getchatLogs() {
  //   this.chatservice.getchatLogs().subscribe((activechat: any) => {
  //     for (let obj of activechat[this.roomid]) {

  //       if (!this.msg.includes(obj)) {

  //         this.msg.push(obj)

  //       }
  //     }
  //     console.log("activechats", activechat);
  //   });
  // }

  individualChat() {
    this.msg = [];
    this.chatservice.individualChat(this.logInuserId, this.roomid).subscribe((allindi: any) => {
      for (let obj of allindi) {
        if (!this.msg.includes(obj)) {
          this.msg.push(obj);
        }
        console.log("allindi----", allindi)
      }
    })
  }
  usernames(searchTerm: any) {
    console.log("filternames", searchTerm)
    this.nameList.usernames(searchTerm);

    this.groupList.usernames(searchTerm);


  }




  onSelectAll(e: any) {
    this.members = [];
    this.members = e;
  }




  allMembersPop() {
    const dialogRef = this.dialog.open(GrpmembersComponent,
      { data: { participants: this.participants }, width: '450px', height: "400px" },

    );

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });


  }
  addName(event:any){
      
  }
  // AllMembersPopclose() {
  //   this.displayStyleAllMembers = "none";
  //   //  this.myDiv.nativeElement.style.overflow = 'auto'

  // }

}
