import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EncargadoI } from 'src/app/model/encargadoi';
import { EncargadoService } from 'src/app/service/encargado.service';

@Component({
  selector: 'app-encargadotecleo',
  templateUrl: './encargadotecleo.component.html',
  styleUrls: ['./encargadotecleo.component.css']
})
export class EncargadotecleoComponent implements OnInit {

  public submitted: Boolean = false;
  frm!: FormGroup;

  ID!:number;
  tituloForm: String="";
  _data?: EncargadoI;

  constructor(private dialogRef: MatDialogRef<EncargadotecleoComponent>
    , @Inject(MAT_DIALOG_DATA) public data: EncargadoI
    , private api : EncargadoService
    , public formBuilder: FormBuilder) { 
      this._data = this.data;
    }

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      dpi: ['', [Validators.required]],
      activo:''
    });

    if(this._data){  
      this.ID = this._data.id; 
      this.frm?.get("nombre")?.setValue( this._data.nombre);
      this.frm?.get("apellido")?.setValue( this._data.apellido);   
      this.frm?.get("direccion")?.setValue( this._data.direccion);   
      this.frm?.get("telefono")?.setValue( this._data.telefono);   
      this.frm?.get("dpi")?.setValue( this._data.dpi);   
      this.frm?.get("activo")?.setValue( this._data.activo);   
      this.tituloForm ="Modificar Encargado" ;
    }else{
      this.tituloForm ="Grabar Encargado";
      this.frm?.get("activo")?.setValue( true)
    }
  }


  cerrar() {
    this.dialogRef.close();
  }



  addItem() {
    this.submitted = true;
      if(this.frm.valid){

        this._data= {
          id: this.ID,
          nombre: this.frm?.get("nombre")?.value,
          apellido: this.frm?.get("apellido")?.value,
          direccion:this.frm?.get("direccion")?.value, 
          telefono:this.frm?.get("telefono")?.value, 
          dpi:this.frm?.get("dpi")?.value,
          activo:true
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
}
