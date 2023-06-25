import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/service/apiservice.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit{
  preview: string = '';

  constructor(public apiservice: ApiserviceService){}

  productForm = new FormGroup({
    productName: new FormControl('',[Validators.required]),
    productPrice: new FormControl('',[Validators.required]),
    productId: new FormControl('',[Validators.required]),
    productCategory: new FormControl('',[Validators.required])
  });
  
  
  
  ngOnInit() {

  }

  save() {
    this.apiservice.saveproduct(this.productForm.value).subscribe(response =>{
      console.log("response",response);
      alert("product saved successfully");
      this.productForm.reset();
    },(error:any)=>{
      alert("product id already exist");
    })
    
    // this.preview = JSON.stringify(this.productForm.value);
  }
}
