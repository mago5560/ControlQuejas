import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EncargadoI } from "../model/encargadoi";
import { URL_HOST } from "../shared/var.constants";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: 'root'
  })
  export class EncargadoService {
  
    url: string = `${URL_HOST}/encargado`;
    
    constructor(private http: HttpClient,private storageService:StorageService){}
  
    listar():Observable<EncargadoI[]>{
        var reqHeader = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
          'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
        })
        return this.http.get<EncargadoI[]>(`${this.url}`,{ headers: reqHeader });
    }

    listarPorID(id:number):Observable<EncargadoI>{
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
      })

        return this.http.get<EncargadoI>(`${this.url}/${id}`,{ headers: reqHeader });
    }

    grabar(cls: EncargadoI):Observable<EncargadoI>{
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
          })

        return this.http.post<EncargadoI>(`${this.url}`,JSON.stringify(cls),{ headers: reqHeader });
    }

    modificar(cls: EncargadoI){
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