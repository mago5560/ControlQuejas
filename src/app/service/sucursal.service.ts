import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SucursalI } from "../model/sucursali";
import { URL_HOST } from "../shared/var.constants";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: 'root'
  })
  export class SucursalService {
  
    url: string = `${URL_HOST}/sucursal`;
    
    constructor(private http: HttpClient,private storageService:StorageService){}
  
    listar():Observable<SucursalI[]>{
        var reqHeader = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
          'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
        })
        return this.http.get<SucursalI[]>(`${this.url}`,{ headers: reqHeader });
    }

    listarPorID(id:number):Observable<SucursalI>{
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
      })

        return this.http.get<SucursalI>(`${this.url}/${id}`,{ headers: reqHeader });
    }

    listarPorComercioId(id:number):Observable<SucursalI[]>{
        var reqHeader = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
          'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
        })
  
          return this.http.get<SucursalI[]>(`${this.url}/comercio/${id}`,{ headers: reqHeader });
      }


    grabar(cls: SucursalI):Observable<SucursalI>{
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
          })

        return this.http.post<SucursalI>(`${this.url}`,JSON.stringify(cls),{ headers: reqHeader });
    }

    modificar(cls: SucursalI){
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