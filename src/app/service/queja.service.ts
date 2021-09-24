import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QuejaI } from "../model/quejai";
import { URL_HOST } from "../shared/var.constants";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: 'root'
  })
  export class QuejaService {
  
    url: string = `${URL_HOST}/queja`;
    
    constructor(private http: HttpClient,private storageService:StorageService){}
  
    listar():Observable<QuejaI[]>{
        var reqHeader = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
          'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
        })
        return this.http.get<QuejaI[]>(`${this.url}`,{ headers: reqHeader });
    }

    listarPorID(id:number):Observable<QuejaI>{
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
      })

        return this.http.get<QuejaI>(`${this.url}/${id}`,{ headers: reqHeader });
    }

    listarPorSucursalId(id:number):Observable<QuejaI[]>{
        var reqHeader = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
          'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
        })
  
          return this.http.get<QuejaI[]>(`${this.url}/sucursal/${id}`,{ headers: reqHeader });
    }

    listarPorComercioId(id:number):Observable<QuejaI[]>{
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
      })

        return this.http.get<QuejaI[]>(`${this.url}/comercio/${id}`,{ headers: reqHeader });
    }

    listarPorMunicipioId(id:number):Observable<QuejaI[]>{
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
      })

        return this.http.get<QuejaI[]>(`${this.url}/municipio/${id}`,{ headers: reqHeader });
    }

    listarPorDepartamentoId(id:number):Observable<QuejaI[]>{
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
      })

        return this.http.get<QuejaI[]>(`${this.url}/departamento/${id}`,{ headers: reqHeader });
    }

    listarPorRegionId(id:number):Observable<QuejaI[]>{
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
      })

        return this.http.get<QuejaI[]>(`${this.url}/region/${id}`,{ headers: reqHeader });
    }

    grabar(cls: QuejaI):Observable<QuejaI>{
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
          })

          console.log(JSON.stringify(cls))
        return this.http.post<QuejaI>(`${this.url}`,JSON.stringify(cls),{ headers: reqHeader });
    }

    modificar(cls: QuejaI){
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