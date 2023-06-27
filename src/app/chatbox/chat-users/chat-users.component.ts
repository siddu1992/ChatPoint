import { Component, OnInit } from '@angular/core';
import { ChatserveService } from 'src/app/service/chatserve.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements OnInit{
  messdis: any;
constructor(public chatservice:ChatserveService){

}

  ngOnInit() {

   

  
  }

}
