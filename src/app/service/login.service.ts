import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_HOST } from '../shared/var.constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = `${URL_HOST}/login`;
  
      
  constructor(private http: HttpClient,private storageService:StorageService){}

  login(usuario:string,contra:string):Observable<string>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.get<string>(`${this.url}/${usuario}/${contra}`,{ headers: reqHeader })
  }
  


}




