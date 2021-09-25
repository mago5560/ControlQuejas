import { Component, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ComercioI } from 'src/app/model/comercioi';
import { DepartamentoI } from 'src/app/model/departamentoi';
import { MunicipioI } from 'src/app/model/municipioi';
import { QuejaI } from 'src/app/model/quejai';
import { RegionI } from 'src/app/model/regioni';
import { SucursalI } from 'src/app/model/sucursali';
import { ComercioService } from 'src/app/service/comercio.service';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { MunicipioService } from 'src/app/service/municipio.service';
import { QuejaService } from 'src/app/service/queja.service';
import { RegionService } from 'src/app/service/region.service';
import { StorageService } from 'src/app/service/storage.service';
import { SucursalService } from 'src/app/service/sucursal.service';
import { HomedetalleComponent } from './homedetalle/homedetalle.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  frm!: FormGroup;
  
 
  _Datos: QuejaI[]=[];


  //Combos
  _dataRegion?:RegionI; 
  _sourceRegion:RegionI[]=[]

  _dataDepartamento?:DepartamentoI; 
  _sourceDepartamento:DepartamentoI[]=[]

  _dataMunicpio?:MunicipioI 
  _sourceMunicipio:MunicipioI[]=[]

  _dataComercio?:ComercioI 
  _sourceComercio:ComercioI[]=[]

  _dataSucursal?:SucursalI 
  _sourceSucursal:SucursalI[]=[]

  constructor(private router: Router,private storageService:StorageService,private service:QuejaService
    ,private regionService:RegionService ,private departamentoService: DepartamentoService, private municipioService:MunicipioService
    , private comercioService:ComercioService, private SucursalService:SucursalService
    ,private dialog: MatDialog
    ,  public formBuilder: FormBuilder) { 
    this.storageService.setTitelNavBar("Inicio");
  }

  ngOnInit(): void {
    
    this.frm = this.formBuilder.group({
      region: '',
      departamento: '',
      municipio: '',
      comercio: '',
      sucursal: ''
    });

    this.buscar();
    this.fillCombo();
  }

  displayedColumns: string[] = ['queja', 'fecha','hora','sucursal'];
  dataSource = new MatTableDataSource(this._Datos);
  
  buscar(){

    if(this.frm?.get("sucursal")?.value){
      this.service.listarPorSucursalId(this.frm?.get("sucursal")?.value).subscribe(data=>{
        this._Datos = data;
        this.dataSource = new MatTableDataSource(this._Datos);
      })  
    }else if(this.frm?.get("comercio")?.value){
      this.service.listarPorComercioId(this.frm?.get("comercio")?.value).subscribe(data=>{
        this._Datos = data;
        this.dataSource = new MatTableDataSource(this._Datos);
      })
    }else if(this.frm?.get("municipio")?.value){
      this.service.listarPorMunicipioId(this.frm?.get("municipio")?.value).subscribe(data=>{
        this._Datos = data;
        this.dataSource = new MatTableDataSource(this._Datos);
      })
    }else if(this.frm?.get("departamento")?.value){
      this.service.listarPorDepartamentoId(this.frm?.get("departamento")?.value).subscribe(data=>{
        this._Datos = data;
        this.dataSource = new MatTableDataSource(this._Datos);
      })
    }else if(this.frm?.get("region")?.value){
      this.service.listarPorRegionId(this.frm?.get("region")?.value).subscribe(data=>{
        this._Datos = data;
        this.dataSource = new MatTableDataSource(this._Datos);
      })
    }else{
      this.service.listar().subscribe(data =>{
        this._Datos = data;
        this.dataSource = new MatTableDataSource(this._Datos);
      })
    }

  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openDialogSucursal(data:QuejaI): void{
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
   
    const dialogRef = this.dialog.open(HomedetalleComponent, dialogConfig);

  }


  fillCombo(){
    this.regionService.listar().subscribe(data =>{
      this._sourceRegion = data;
    })
    
  }

  onChangeRegion(){
    this.departamentoService.listarPorRegionId(this.frm?.get("region")?.value).subscribe(data =>{
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

}
