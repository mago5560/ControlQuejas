import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComercioI } from 'src/app/model/comercioi';
import { DepartamentoI } from 'src/app/model/departamentoi';
import { EncargadoI } from 'src/app/model/encargadoi';
import { MunicipioI } from 'src/app/model/municipioi';
import { ComercioService } from 'src/app/service/comercio.service';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { EncargadoService } from 'src/app/service/encargado.service';
import { MunicipioService } from 'src/app/service/municipio.service';

@Component({
  selector: 'app-comerciotecleo',
  templateUrl: './comerciotecleo.component.html',
  styleUrls: ['./comerciotecleo.component.css']
})
export class ComerciotecleoComponent implements OnInit {

  public submitted: Boolean = false;
  frm!: FormGroup;

  ID!:number;
  tituloForm: String="";
  _data?: ComercioI;


  //Combos
  _dataDepartamento?:DepartamentoI; 
  _sourceDepartamento:DepartamentoI[]=[]

  _dataMunicpio?:MunicipioI 
  _sourceMunicipio:MunicipioI[]=[]

  _dataEncargado?:EncargadoI 
  _sourceEncargado:EncargadoI[]=[]


  constructor(private dialogRef: MatDialogRef<ComerciotecleoComponent>
    , @Inject(MAT_DIALOG_DATA) public data: ComercioI
    , private api : ComercioService, private departamentoService: DepartamentoService, private municipioService:MunicipioService, private encargadoService: EncargadoService
    , public formBuilder: FormBuilder) { 
     this._data = this.data;
      this.fillCombo();
    }

  ngOnInit(): void {    
    this.frm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      encargado: ['', [Validators.required]]
    });

    if(this._data){  
      this.ID = this._data.id; 
      this.frm?.get("municipio")?.setValue( this._data.municipio?.id);
      this.frm?.get("encargado")?.setValue( this._data.encargado?.id);
      this.frm?.get("nombre")?.setValue( this._data.nombre);    
      this.tituloForm ="Modificar Comercio" ;
    }else{
      this.tituloForm ="Grabar Comercio";
    }
  }


  cerrar() {
    this.dialogRef.close();
  }



  addItem() {
    this.submitted = true;
      if(this.frm.valid){

        this._dataMunicpio =  this._sourceMunicipio.find(c => c.id == this.frm?.get("municipio")?.value);
        this._dataEncargado = this._sourceEncargado.find(c => c.id == this.frm?.get("encargado")?.value);
        this._data= {
          id: this.ID,
          nombre: this.frm?.get("nombre")?.value,
          municipioId: this.frm?.get("municipio")?.value,
          municipio:  this._dataMunicpio,
          encargadoId: this.frm?.get("encargado")?.value,
          encargado: this._dataEncargado
        }
      
        if(!this._data.id){
          this.api.grabar(this._data).subscribe(data => {
              this.dialogRef.close(true);
          })
        }else{
          this.api.modificar(this._data).subscribe(data => {
              this.dialogRef.close(true);
          })
        }
      
    }
  }

  fillCombo(){
    this.departamentoService.listar().subscribe(data =>{
      this._sourceDepartamento = data;
    })

    this.municipioService.listar().subscribe(data =>{
      this._sourceMunicipio = data;
    })

    this.encargadoService.listar().subscribe(data =>{
      this._sourceEncargado = data;
    })
  }

  onChangeDepartamento(){
    this.municipioService.listarPorDepartamentoId(this.frm?.get("departamento")?.value).subscribe(data =>{
      this._sourceMunicipio = data;
    })
  }

}
