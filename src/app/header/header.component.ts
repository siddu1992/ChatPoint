import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartserviceService } from '../service/cartservice.service';
import { Router } from '@angular/router';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  searchTerm: any;
  totalItem :any;
  name: any;
  chartservice: any;
  
  @Output() searchChanged = new EventEmitter<string>();

constructor(private cartservice:CartserviceService, public router:Router, private apiservice:ApiserviceService){}
  ngOnInit() {
    let user = JSON.parse(String(localStorage.getItem("userdetails")));
this.name=user.Name;
    this.cartservice.getproducts().subscribe(res=>{
      this.totalItem = res.lenght;
    })



  
   
  }

search() {
  this.cartservice.search.next(this.searchTerm);

  }
  logout(){
  let exit = confirm("Do you want to Exit");
  if(exit==true){
    localStorage.clear();
    this.router.navigateByUrl("/login") 

  }

   }

   onSearch(input: any) {
    console.log(input.target.value)
    this.searchChanged.emit(input.target.value);
  }
}


