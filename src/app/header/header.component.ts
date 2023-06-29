import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../service/cartservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  searchTerm: any;
  totalItem :any;
  name: any;
constructor(private cartservice:CartserviceService, public router:Router){}
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
    localStorage.clear();
    this.router.navigateByUrl("/login") 
   }

}

