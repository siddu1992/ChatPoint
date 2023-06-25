import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdGuard implements CanActivate {

  constructor(public router: Router){}

  canActivate(){
    if(localStorage.getItem("loggedin")=="true"){
      return true;
    }
    else{
      this.router.navigateByUrl("/login");
      return false; 

    }
  }
  
}
