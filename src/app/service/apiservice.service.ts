import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
baseUrl:any="http://192.168.1.6:4000/"
  constructor(private http:HttpClient) {

   }

   getproduct (){
    
    return this.http.get<any>(this.baseUrl+"products/allproducts")
    .pipe(map((res:any)=>{
      return res
    }))
   }


   saveproduct (product:any){
    
    return this.http.post<any>(this.baseUrl+"products/create",product)
    .pipe(map((res:any)=>{
      return res;
    }))
   }

   getuser (){
    
    return this.http.get<any>(this.baseUrl+"users/allusers")
    .pipe(map((resp:any)=>{
      return resp
    }))
   }

   saveuser (user:any){
    
    return this.http.post<any>(this.baseUrl+"users/add", user)
    .pipe(map((resp:any)=>{
      return resp
    }))
   }

   delproduct (id:any){
    
    return this.http.delete<any>(this.baseUrl+`products/delete?id=${id}`)
    .pipe(map((resp:any)=>{
      return resp
    }))
   }


   updateproduct (body:any){
    
    return this.http.put<any>(this.baseUrl+`products/update?id=${body._id}`,body )
    .pipe(map((resp:any)=>{
      return resp
    }))
   }

   deluser (id:any){
    
    return this.http.delete<any>(this.baseUrl+`users/delete?id=${id}`)
    .pipe(map((resp:any)=>{
      return resp
    }))
   }

   updateuser (body:any){
    
    return this.http.put<any>(this.baseUrl+`users/update?id=${body._id}`,body )
    .pipe(map((resp:any)=>{
      return resp
    }))
   }

   userlogin(body:any){
    
    return this.http.post<any>(this.baseUrl+`users/login`,body )
    .pipe(map((resp:any)=>{
      return resp
    }))
   }

   


}
