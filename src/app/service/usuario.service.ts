import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UsuarioI } from "../model/usuarioi";
import { URL_HOST } from "../shared/var.constants";
import { StorageService } from "./storage.service";


@Injectable({
    providedIn: 'root'
  })
  export class UsuarioService {
  
    url: string = `${URL_HOST}/usuario`;
    
    constructor(private http: HttpClient,private storageService:StorageService){}
  
    listar():Observable<UsuarioI[]>{
        var reqHeader = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
          'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
        })
        return this.http.get<UsuarioI[]>(`${this.url}`,{ headers: reqHeader });
    }

    listarPorID(id:number):Observable<UsuarioI>{
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
      })

        return this.http.get<UsuarioI>(`${this.url}/${id}`,{ headers: reqHeader });
    }

    grabar(cls: UsuarioI):Observable<UsuarioI>{
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
          })

        return this.http.post<UsuarioI>(`${this.url}`,JSON.stringify(cls),{ headers: reqHeader });
    }

    modificar(cls: UsuarioI){
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
          })
       return this.http.put(`${this.url}/${cls.id}`,JSON.stringify(cls),{ headers: reqHeader })
    }

    eliminar(id: number){
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
      })
        return this.http.delete(`${this.url}/${id}`,{ headers: reqHeader })
    }

  
  }