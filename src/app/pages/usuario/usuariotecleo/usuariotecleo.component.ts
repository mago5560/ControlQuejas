import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioI } from 'src/app/model/usuarioi';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuariotecleo',
  templateUrl: './usuariotecleo.component.html',
  styleUrls: ['./usuariotecleo.component.css']
})
export class UsuariotecleoComponent implements OnInit {
  public submitted: Boolean = false;
  frm!: FormGroup;

  ID!:number;
  tituloForm: String="";
  _data?: UsuarioI;


  constructor(private dialogRef: MatDialogRef<UsuariotecleoComponent>
    , @Inject(MAT_DIALOG_DATA) public data: UsuarioI
    , private api : UsuarioService
    , public formBuilder: FormBuilder) { 
      this._data = this.data;
    }

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      contraseña: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      activo:''
    });

    if(this._data){  
      this.ID = this._data.id; 
      this.frm?.get("nombre")?.setValue( this._data.nombre);
      this.frm?.get("apellido")?.setValue( this._data.apellido);   
      this.frm?.get("direccion")?.setValue( this._data.direccion);   
      this.frm?.get("telefono")?.setValue( this._data.telefono);   
      this.frm?.get("contraseña")?.setValue( this._data.contraseña);  
      this.frm?.get("usuario")?.setValue( this._data.usuario);   
      this.frm?.get("activo")?.setValue( this._data.activo);   
      this.tituloForm ="Modificar Usuario" ;
    }else{
      this.tituloForm ="Grabar Usuario";
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
          contraseña:this.frm?.get("contraseña")?.value,
          usuario:this.frm?.get("usuario")?.value,
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
