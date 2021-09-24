import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { StorageService } from "../service/storage.service";

@Injectable({
    providedIn: 'root'
  })
  export class AuthorizationGuard implements CanActivate {
  
    constructor(private router:Router, private storageService: StorageService){}
  
     canActivate() {
       if(! this.storageService.isAuthenticated()){
          // not logged in so redirect to login page
          this.router.navigate(['/queja']);
         return false;
       }
       return true;
     }
    
  }