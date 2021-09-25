import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComercioI } from 'src/app/model/comercioi';
import { DepartamentoI } from 'src/app/model/departamentoi';
import { MunicipioI } from 'src/app/model/municipioi';
import { RegionI } from 'src/app/model/regioni';
import { SucursalI } from 'src/app/model/sucursali';
import { ComercioService } from 'src/app/service/comercio.service';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { MunicipioService } from 'src/app/service/municipio.service';
import { RegionService } from 'src/app/service/region.service';
import { SucursalService } from 'src/app/service/sucursal.service';

@Component({
  selector: 'app-homedetalle',
  templateUrl: './homedetalle.component.html',
  styleUrls: ['./homedetalle.component.css']
})
export class HomedetalleComponent implements OnInit {

  tituloForm: String="";
  public _data!:SucursalI;

  public nombreComercio:string = "";
  public nombreEncargado:string="";
  public telefonoEncargado:number = 0;

  public ubicacion:string="";

  constructor( private dialogRef: MatDialogRef<HomedetalleComponent>
    , @Inject(MAT_DIALOG_DATA) public data: SucursalI) { 
      this._data = data;
    }

  ngOnInit(): void {
    this.tituloForm ="Detalle de sucursal "+ this._data?.nombre ;
    this.fillDatos();
  }

  cerrar() {
    this.dialogRef.close();
  }


  fillDatos(){
     this.nombreComercio = this._data?.comercio?.nombre || "";
     this.nombreEncargado= this._data?.comercio?.encargado?.nombre + " " + this._data?.comercio?.encargado?.apellido || "";
     this.telefonoEncargado= this._data?.comercio?.encargado?.telefono  || 0;
     this.ubicacion= this._data?.comercio?.municipio?.nombre +", "+ this._data?.comercio?.municipio?.departamento?.nombre +", "+ this._data?.comercio?.municipio?.departamento?.region?.nombre
     
  }
}
