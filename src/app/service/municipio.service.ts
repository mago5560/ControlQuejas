import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MunicipioI } from "../model/municipioi";
import { URL_HOST } from "../shared/var.constants";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: 'root'
  })
  export class MunicipioService {
  
    url: string = `${URL_HOST}/municipio`;
    
    constructor(private http: HttpClient,private storageService:StorageService){}
  
    listar():Observable<MunicipioI[]>{
        var reqHeader = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
          'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
        })
        return this.http.get<MunicipioI[]>(`${this.url}`,{ headers: reqHeader });
    }

    listarPorID(id:number):Observable<MunicipioI>{
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
      })

        return this.http.get<MunicipioI>(`${this.url}/${id}`,{ headers: reqHeader });
    }

    listarPorDepartamentoId(id:number):Observable<MunicipioI[]>{
        var reqHeader = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
          'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
        })
  
          return this.http.get<MunicipioI[]>(`${this.url}/departamento/${id}`,{ headers: reqHeader });
      }

    grabar(cls: MunicipioI):Observable<MunicipioI>{
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
          })

        return this.http.post<MunicipioI>(`${this.url}`,JSON.stringify(cls),{ headers: reqHeader });
    }

    modificar(cls: MunicipioI){
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