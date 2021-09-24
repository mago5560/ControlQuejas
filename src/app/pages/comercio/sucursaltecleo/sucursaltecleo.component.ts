import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ComercioI } from 'src/app/model/comercioi';
import { MensajeI } from 'src/app/model/mensajei';
import { SucursalI } from 'src/app/model/sucursali';
import { SucursalService } from 'src/app/service/sucursal.service';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-sucursaltecleo',
  templateUrl: './sucursaltecleo.component.html',
  styleUrls: ['./sucursaltecleo.component.css']
})
export class SucursaltecleoComponent implements OnInit {
  public submitted: Boolean = false;
  frm!: FormGroup;
  modifica:Boolean = false;

  ID!:number;
  tituloForm: String="";
  _data?: SucursalI;
  _dataComercio!:ComercioI

  constructor(private dialogRef: MatDialogRef<SucursaltecleoComponent>
    , @Inject(MAT_DIALOG_DATA) public data: ComercioI
    ,private dialog: MatDialog
    ,private snackBar: MatSnackBar
    , private api : SucursalService
    , public formBuilder: FormBuilder) { 
     this._dataComercio = this.data;
    }

  ngOnInit(): void {    
    this.frm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    });

    if(this._dataComercio){  
      this.tituloForm ="Agregar Sucursal del Comercio "+ this._dataComercio.nombre;
      this.buscar();
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
          telefono: this.frm?.get("telefono")?.value,
          direccion:  this.frm?.get("direccion")?.value,
          comercioId: this._dataComercio.id,
          comercio: this._dataComercio,
        }
        console.log(this._data)
        if(!this._data.id){
          this.api.grabar(this._data).subscribe(data => {
              this.onResetForm();
          })
        }else{
          this.api.modificar(this._data).subscribe(data => {
            this.onResetForm();
          })
        }
    
    }
  }

  onResetForm(){
    this.frm.reset();
    this.modifica = false;
    this.buscar();
  }

  displayedColumns: string[] = ['sucursal','detalle','acciones'];
  dataSource!: MatTableDataSource<SucursalI>;
  _DataDetalle: SucursalI []=[];

  buscar(){
    this.api.listarPorComercioId(this._dataComercio.id).subscribe(data =>{
      this._DataDetalle = data;
      this.dataSource = new MatTableDataSource(this._DataDetalle);
    })
  }


  modificar(data:SucursalI){
        
      this.ID = data.id; 
      this.frm?.get("nombre")?.setValue( data.nombre);
      this.frm?.get("direccion")?.setValue( data.direccion);
      this.frm?.get("telefono")?.setValue( data.telefono);    

      
  }

  eliminar(data:SucursalI){
    let mensaje: MensajeI={titulo: "Eliminar",mensaje:"¿Esta seguro que desea eliminar el registro?. Ya no podra recuperarlo."}

    this.dialog
    .open(DialogComponent, {
      data: mensaje
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.api.eliminar(data.id).subscribe(data => {
       
          this.snackBar.open('Registro eliminado correctamente', 'Aceptar', {
            duration: 2000,
          });
          this.buscar();
        })
      } 
    });
  }



}
