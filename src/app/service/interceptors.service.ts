import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiserviceService } from './apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService {

  constructor(public apiservice:ApiserviceService) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem("mytoken");
   
  const authReq = httpRequest.clone({
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `gJWT ${jwt}`,
      'Access-Control-Allow-Origin':'*'
    })
  });
 
   return next.handle(authReq);

}
}
