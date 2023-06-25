import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ApiserviceService } from '../service/apiservice.service';
import { CartserviceService } from '../service/cartservice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit,AfterViewInit {
productList : any;
filterCategory : any;
 
  searchkey: any;
  @ViewChild("colorgetha")mark!:ElementRef;
 

constructor(private apiservice:ApiserviceService,private cartservice :CartserviceService){}
  ngAfterViewInit() {
    console.log(this.mark);
    this.mark.nativeElement.style.color="red";
   // this.mark.nativeElement.style.color="green";

  }
 

ngOnInit(){
  this.apiservice.getproduct().subscribe(res=>{
    this.productList = res.product;
    this.filterCategory = res.product;
    this.productList.forEach((a: any)=> {
      if (a.category == "women's Clothing" || a.category == "men's clothing")
         {a.category = "fashion";}

        //  Object.assign(a,{quantity:1,total:a.price});

    });
    console.log(this.productList.product);

  });

this.cartservice.search.subscribe((val:any)=>{
this.searchkey = val;



})


}

filter(category:any){
  this.filterCategory = this.productList
  .filter((a:any)=>
  {if(a.category == category || category == '-')
  {return a;}
  })

}
addtomycart(item:any) {

}
}

