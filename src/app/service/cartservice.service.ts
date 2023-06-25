import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {
  public search = new BehaviorSubject<string>("");
  public productList = new BehaviorSubject<any>([]);

  constructor(private Http:HttpClient) { }

  getproducts(){
    return this.productList.asObservable();
  }
  

}
