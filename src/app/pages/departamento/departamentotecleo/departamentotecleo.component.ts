import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartamentoI } from 'src/app/model/departamentoi';
import { RegionI } from 'src/app/model/regioni';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { RegionService } from 'src/app/service/region.service';

@Component({
  selector: 'app-departamentotecleo',
  templateUrl: './departamentotecleo.component.html',
  styleUrls: ['./departamentotecleo.component.css']
})
export class DepartamentotecleoComponent implements OnInit {

  
  public submitted: Boolean = false;
  frm!: FormGroup;

  ID!:number;
  tituloForm: String="";
  _data?: DepartamentoI;


  //Combos
  _dataRegion?:RegionI 
  _sourceRegion:RegionI[]=[]

  constructor(private dialogRef: MatDialogRef<DepartamentotecleoComponent>
    , @Inject(MAT_DIALOG_DATA) public data: DepartamentoI
    , private api : DepartamentoService, private regionService: RegionService
    , public formBuilder: FormBuilder) { 
      this._data = this.data;
      this.fillCombo();
    }

  ngOnInit(): void {    
    this.frm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      region: ['', [Validators.required]]
    });

    if(this._data){  
      this.ID = this._data.id; 
      this.frm?.get("nombre")?.setValue( this._data.nombre);
      this.frm?.get("region")?.setValue( this._data.region?.id);
      this.tituloForm ="Modificar Departamento" ;
    }else{
      this.tituloForm ="Grabar Departamento";
    }
  }


  cerrar() {
    this.dialogRef.close();
  }



  addItem() {
    this.submitted = true;
      if(this.frm.valid){

        this._dataRegion =  this._sourceRegion.find(c => c.id == this.frm?.get("region")?.value);
        this._data= {
          id: this.ID,
          nombre: this.frm?.get("nombre")?.value,
          regionId: this.frm?.get("region")?.value,
          region:  this._dataRegion     
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
    this.regionService.listar().subscribe(data =>{
      this._sourceRegion = data;
    })
  }

}
