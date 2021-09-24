import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ComercioI } from 'src/app/model/comercioi';
import { DepartamentoI } from 'src/app/model/departamentoi';
import { MunicipioI } from 'src/app/model/municipioi';
import { QuejaI } from 'src/app/model/quejai';
import { SucursalI } from 'src/app/model/sucursali';
import { ComercioService } from 'src/app/service/comercio.service';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { MunicipioService } from 'src/app/service/municipio.service';
import { QuejaService } from 'src/app/service/queja.service';
import { StorageService } from 'src/app/service/storage.service';
import { SucursalService } from 'src/app/service/sucursal.service';

@Component({
  selector: 'app-queja',
  templateUrl: './queja.component.html',
  styleUrls: ['./queja.component.css']
  ,providers:[DatePipe]
})
export class QuejaComponent implements OnInit {

  frm!: FormGroup;
  
  ID!:number;
  _data?: QuejaI;

  //Combos
  _dataDepartamento?:DepartamentoI; 
  _sourceDepartamento:DepartamentoI[]=[]

  _dataMunicpio?:MunicipioI 
  _sourceMunicipio:MunicipioI[]=[]

  _dataComercio?:ComercioI 
  _sourceComercio:ComercioI[]=[]

  _dataSucursal?:SucursalI 
  _sourceSucursal:SucursalI[]=[]


  constructor( private snackBar: MatSnackBar,private router: Router,public storageService:StorageService
    , private api : QuejaService
    , private departamentoService: DepartamentoService, private municipioService:MunicipioService, private comercioService:ComercioService, private SucursalService:SucursalService
    , private  datePipe: DatePipe
    , public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      departamento: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      comercio: ['', [Validators.required]],
      sucursal: ['', [Validators.required]],
      observaciones: ['', [Validators.required]]
    });

    this.fillCombo();
  }

  ingresar(){this.router.navigate(['/login']);}


  grabar(){
    if(this.frm.valid){ 
      
      this._dataDepartamento = this._sourceDepartamento.find(c => c.id == this.frm?.get("departamento")?.value);

      this._data= {
        id: this.ID,
        fecha: this.datePipe.transform(new Date(),"dd/MM/yyyy") || "",
        hora: this.datePipe.transform(new Date(),"HH:mm:ss") || "",
        observaciones:  this.frm?.get("observaciones")?.value,
        sucursalId: this.frm?.get("sucursal")?.value,
        comercioId: this.frm?.get("comercio")?.value,
        municipioId: this.frm?.get("municipio")?.value,
        departamentoId: this.frm?.get("departamento")?.value,
        regionId: this._dataDepartamento?.regionId || 0
      }

        this.api.grabar(this._data).subscribe(data => {
          this.snackBar.open('Su comentario, sujerencia o queja fue enviada correctamente.', '', {
            duration: 4000,
          });
          this.onResetForm();
        })
  
  }
    
  }

  fillCombo(){
    this.departamentoService.listar().subscribe(data =>{
      this._sourceDepartamento = data;
    })
    
  }


  onChangeDepartamento(){
    this.municipioService.listarPorDepartamentoId(this.frm?.get("departamento")?.value).subscribe(data =>{
      this._sourceMunicipio = data;
    })
  }

  onChangeMunicipio(){
    this.comercioService.listarPorMunicipioId(this.frm?.get("municipio")?.value).subscribe(data =>{
      this._sourceComercio = data;
    })
  }

  onChangeComercio(){
    this.SucursalService.listarPorComercioId(this.frm?.get("comercio")?.value).subscribe(data =>{
      this._sourceSucursal = data;
    })
  }

  onResetForm(){
    this.frm.reset();
  }
}
