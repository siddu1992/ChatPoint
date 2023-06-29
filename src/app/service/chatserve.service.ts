import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatserveService {
  barseurl:any="http://192.168.1.6:4000"
  

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public chattoUserList : BehaviorSubject<string> = new BehaviorSubject('');

  userdetails:any;
  jwt: any;
  id: any;
  constructor(private http:HttpClient) {
    
    this.userdetails=localStorage.getItem("userdetails");
    this.id = JSON.parse(this.userdetails).id;
   // this.jwt = localStorage.getItem("mytoken");

  }


  
  socket = io(this.barseurl, {
    
    reconnectionDelayMax: 10000,
    auth: {
      token: "gJWT "+localStorage.getItem("mytoken"),
      userId:JSON.parse(String(localStorage.getItem("userdetails"))).id
    },
    query: {
     // "token":"gJWT "+this.jwt
    }
  });



  authenticate(userId: string): void {
    this.socket.emit('authenticate', userId);
  }

  sendindividualMsg(recipientId: string, message: string): void {
    this.socket.emit('individualMsg', {recipientId: recipientId,message: message });
  }

  receiveindividualMsg(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('individualMsg', (data: any) => observer.next(data));
    });
  }





  saveChatroom (product:any){
    
    return this.http.post<any>(this.barseurl+"/chat/create",product)
    .pipe(map((res:any)=>{
      return res;
    }))
   }

   getAllchatrooms (){
    
    return this.http.get<any>(this.barseurl+"/chat/allchats")
    .pipe(map((resp:any)=>{
      return resp
    }))
   }
   
   

  public  joinRoom(_id:any){
    console.log('joinRoom: ', _id)
   this.socket.emit('joinRoom', _id);
   return "success"
  }



  public sendMesaage(chatroomId:any,msg:any,uni:any,imgname:any) {
    this.socket.emit('chatroomMessage',{chatroomId:chatroomId,message: msg,img:uni,imgname:imgname});

     return this.message$.asObservable();
  };

  public allNewMessage = () => {
    this.socket.on('newMessage', (message:any) =>{
      console.log("message all",message);
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };


  getAllboxMesages (rid:any,userId:any){
    
    return this.http.get<any>(this.barseurl+"/chat/messages?chatId="+rid+"&userId="+userId)
    .pipe(map((resp:any)=>{
      return resp
    }))
   }

sendMesstoUser(messuser:any){
this.chattoUserList.next(messuser);

}


}
