import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { SessionI } from "../model/sessioni";
import { UsuarioTokenI } from "../model/usuariotokeni";




@Injectable({
    providedIn: 'root'
  })
  
  export class StorageService {
  
    private localStorageService;
    private currentSession =new SessionI ;
  
    constructor(private router: Router) {
        this.localStorageService = localStorage;
        this.currentSession = this.loadSessionData();
     }
  
     setCurrentSession(session: SessionI): void {
      this.currentSession = session;
      this.localStorageService.setItem('token', JSON.stringify(session));
    }
  
     loadSessionData(): SessionI{
      var sessionStr = this.localStorageService.getItem('token');
      return (sessionStr) ? <SessionI> JSON.parse(sessionStr) : new SessionI;
    }
  
    getCurrentSession(): SessionI {
      return this.currentSession;
    }
  
    removeCurrentSession(): void {
      this.localStorageService.removeItem('token');
      this.currentSession = new SessionI;
    }
  
    isAuthenticated(): boolean {
      const helper = new JwtHelperService();
      return (this.getCurrentToken() != null && !helper.isTokenExpired(this.getCurrentToken())) ? true : false;
    };
  
  
  
    getCurrentToken(): string {
      var session = this.getCurrentSession();
      return (session && session.token) ? session.token : '';
    };
  
    getUserToken():UsuarioTokenI{
      const helper = new JwtHelperService();
      var session  = this.getCurrentSession();
      return helper.decodeToken(session.token)
    }
  
    logout(): void{
      this.removeCurrentSession();
      this.router.navigate(['/queja']);
    }

    titelNavBar:string ="";
    setTitelNavBar(titel:string){
      this.titelNavBar = titel;
    }
    
    getTitelNavBar():string{
      return this.titelNavBar;
    }

  }
  