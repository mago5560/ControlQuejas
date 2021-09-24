import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ComercioI } from "../model/comercioi";
import { URL_HOST } from "../shared/var.constants";
import { StorageService } from "./storage.service";




@Injectable({
    providedIn: 'root'
  })
  export class ComercioService {
  
    url: string = `${URL_HOST}/comercio`;
    
    constructor(private http: HttpClient,private storageService:StorageService){}
  
    listar():Observable<ComercioI[]>{
        var reqHeader = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
          'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
        })
        return this.http.get<ComercioI[]>(`${this.url}`,{ headers: reqHeader });
    }

    listarPorID(id:number):Observable<ComercioI>{
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
      })

        return this.http.get<ComercioI>(`${this.url}/${id}`,{ headers: reqHeader });
    }

    listarPorMunicipioId(id:number):Observable<ComercioI[]>{
        var reqHeader = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
          'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
        })
  
          return this.http.get<ComercioI[]>(`${this.url}/municipio/${id}`,{ headers: reqHeader });
      }

      listarPorEncargadoId(id:number):Observable<ComercioI[]>{
        var reqHeader = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
          'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
        })
  
          return this.http.get<ComercioI[]>(`${this.url}/encargado/${id}`,{ headers: reqHeader });
      }

    grabar(cls: ComercioI):Observable<ComercioI>{
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
          })

        return this.http.post<ComercioI>(`${this.url}`,JSON.stringify(cls),{ headers: reqHeader });
    }

    modificar(cls: ComercioI){
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