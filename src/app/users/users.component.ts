import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  filteruser: any;
  constructor(public apiservice:ApiserviceService){}

  ngOnInit(){
    this.apiservice.getuser().subscribe(resp=>{
      this.filteruser = resp.user;
      console.log(resp);
    });
  }
  addtomycart(obj:any){
    
  }
}
