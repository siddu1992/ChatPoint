import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatserveService {
  barseurl:any="http://192.168.1.4:4000/chat/"

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  userdetails:any;
  jwt: any;
  id: any;
  constructor(private http:HttpClient) {
    
    this.userdetails=localStorage.getItem("userdetails");
    this.id = JSON.parse(this.userdetails).id;
   // this.jwt = localStorage.getItem("mytoken");

  }


  
  socket = io("http://192.168.1.4:4000", {
    
    reconnectionDelayMax: 10000,
    auth: {
      token: "gJWT "+localStorage.getItem("mytoken"),
      userId:JSON.parse(String(localStorage.getItem("userdetails"))).id
    },
    query: {
     // "token":"gJWT "+this.jwt
    }
  });


  saveChatroom (product:any){
    
    return this.http.post<any>(this.barseurl+"create",product)
    .pipe(map((res:any)=>{
      return res;
    }))
   }

   getAllchatrooms (){
    
    return this.http.get<any>(this.barseurl+"allchats")
    .pipe(map((resp:any)=>{
      return resp
    }))
   }
   
   

  public joinRoom(_id:any){
    console.log('joinRoom: ', _id)
   this.socket.emit('joinRoom', _id);
   return "success"
  }

  public sendMessage(message: any) {
    console.log('sendMessage: ', message)
    this.socket.emit('newMessage', message);
  }

  public getNewMessage(chatroomId:any,msg:any) {
    this.socket.emit('chatroomMessage',{chatroomId:chatroomId,message: msg});

     return this.message$.asObservable();
  };

  public allNewMessage = () => {
    this.socket.on('newMessage', (message) =>{
      console.log("message all",message);
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };


  getAllboxMesages (rid:any,userId:any){
    
    return this.http.get<any>(this.barseurl+"messages?chatId="+rid+"&userId="+userId)
    .pipe(map((resp:any)=>{
      return resp
    }))
   }

}
