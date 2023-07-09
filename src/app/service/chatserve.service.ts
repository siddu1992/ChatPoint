import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatserveService {
  barseurl:any="http://192.168.1.4:4000"
  
  public acctive$: BehaviorSubject<string> = new BehaviorSubject('');

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public chattoUserList : BehaviorSubject<string> = new BehaviorSubject('');

 
  constructor(private http:HttpClient) {
    
  
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

  sendindividualMsg(logInuserId:any,recipientId: string, message: string,img:any,imgname:any): void {
    this.socket.emit('individualMsg', {sender:logInuserId,recipientId: recipientId,message: message,img:img,imgname:imgname });
  }

  receiveindividualMsg(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('individualMsg', (data: any) => observer.next(data));
    });
  }





  saveChatroom (group:any){
    
    return this.http.post<any>(this.barseurl+"/chat/create",group)
    .pipe(map((res:any)=>{
      return res;
    }))
   }

   getAllchatrooms (obj:any){
    
    return this.http.post<any>(this.barseurl+"/chat/allchats",obj)
    .pipe(map((resp:any)=>{
      return resp
    }))
   }
   
   getChatroombyId(roomid:any){
    return this.http.post<any>(this.barseurl+"/chat/chatroom",{roomid:roomid})
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
Activechatlogs(loginUser:any,recipient:any){
  this.socket.emit('getChatLogs', {
    user1: loginUser,
    user2: recipient
  });
}



ActiveUsersList(): Observable<any>{
  return new Observable<any>(observer1 => {
    this.socket.on('userList', (userList: any) => observer1.next(userList));
  });


  
} 
getchatLogs(): Observable<any>{
  return new Observable<any>(observer1 => {
    this.socket.on('chatLogs', (loglist: any) => observer1.next(loglist));
  }); 
}  

individualChat(senderId:any,receaverId:any){
  return this.http.get<any>(this.barseurl+"/chat/allIndividulChat?receaverId="+receaverId+"&senderId="+senderId)
  .pipe(map((resp:any)=>{
    return resp
  }))}



  addMeberTogroup(roomid:any,members:any):Observable<any>{
    return this.http.post<any>(this.barseurl+"/chat/addMeberTogroup",{members:members,roomid:roomid})
    .pipe(map((res:any)=>{
      return res;
    }))
  }


  
  unseenMsg(obj:any):Observable<any>{
    return this.http.post<any>(this.barseurl+"/chat/Chatunseen",obj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateseen(obj:any):Observable<any>{
    return this.http.post<any>(this.barseurl+"/chat/updateSeen",obj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
