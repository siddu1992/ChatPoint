import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/service/apiservice.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit{
  productlist: any;
  displayStyle = "none";
  preview: string = '';
  filterprod:any;
  constructor(public apiservice:ApiserviceService){}
 

  productForm = new FormGroup({
    _id: new FormControl(''),
    productName: new FormControl('',[Validators.required]),
    productPrice: new FormControl('',[Validators.required]),
    productId: new FormControl('',[Validators.required]),
    productCategory: new FormControl('',[Validators.required])
  });

  
  ngOnInit(){
    this.apiservice.getproduct().subscribe(res=>{
      this.productlist = res.product;
      this.filterprod= res.product;
      });
      
  }
  
  conformdel(id:any){
    let s = confirm("confirm to delete");
    if(s==true){
      this.deletepro(id);
    }
    
  }
  deletepro(id:any) {
    this.apiservice.delproduct(id).subscribe(res=>{
      alert (res.message);
      this.ngOnInit();
    })
  }

  // updatepro(id) {
    
  // }



  
  openPopup(obj:any) {
    this.displayStyle = "block";
    
    this.productForm.patchValue(obj);
  }
  closePopup() {
    this.displayStyle = "none";
  }


  update() {
    this.apiservice.updateproduct(this.productForm.value).subscribe(response =>{
      console.log("response",response);
      alert("product updated successfully");
      this.productForm.reset();
      this.ngOnInit();
      this.closePopup();
    })
  }

  filterproduct(anyname:any){
    console.log(anyname.target.value)
    this.filterprod = this.productlist.filter((obj:any)=>{
      return obj.productName.toLowerCase().includes(anyname.target.value)
      
    })
    
  }

}
