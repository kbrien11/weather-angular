import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
  
    if(this.auth.isLoggedIn()){
       
        return true;
    }
    else{
        alert('please login to gain access to this route')
   
        this.router.navigate(['login']);
        return false;
    }
  
}
}