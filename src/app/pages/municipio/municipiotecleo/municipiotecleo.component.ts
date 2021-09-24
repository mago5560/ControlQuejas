import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartamentoI } from 'src/app/model/departamentoi';
import { MunicipioI } from 'src/app/model/municipioi';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { MunicipioService } from 'src/app/service/municipio.service';

@Component({
  selector: 'app-municipiotecleo',
  templateUrl: './municipiotecleo.component.html',
  styleUrls: ['./municipiotecleo.component.css']
})
export class MunicipiotecleoComponent implements OnInit {
  public submitted: Boolean = false;
  frm!: FormGroup;

  ID!:number;
  tituloForm: String="";
  _data?: MunicipioI;


  //Combos
  _dataDepartamento?:DepartamentoI 
  _sourceDepartamento:DepartamentoI[]=[]

  constructor(private dialogRef: MatDialogRef<MunicipiotecleoComponent>
    , @Inject(MAT_DIALOG_DATA) public data: MunicipioI
    , private api : MunicipioService, private departamentoService: DepartamentoService
    , public formBuilder: FormBuilder) { 
      this._data = this.data;
      this.fillCombo();
    }

  ngOnInit(): void {    
    this.frm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      departamento: ['', [Validators.required]]
    });

    if(this._data){  
      this.ID = this._data.id; 
      this.frm?.get("nombre")?.setValue( this._data.nombre);
      this.frm?.get("departamento")?.setValue( this._data.departamento?.id);
      this.tituloForm ="Modificar Municipio" ;
    }else{
      this.tituloForm ="Grabar Municipio";
    }
  }


  cerrar() {
    this.dialogRef.close();
  }



  addItem() {
    this.submitted = true;
      if(this.frm.valid){

        this._dataDepartamento =  this._sourceDepartamento.find(c => c.id == this.frm?.get("departamento")?.value);
        this._data= {
          id: this.ID,
          nombre: this.frm?.get("nombre")?.value,
          departamentoId: this.frm?.get("departamento")?.value,
          departamento:  this._dataDepartamento     
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
  }
}
