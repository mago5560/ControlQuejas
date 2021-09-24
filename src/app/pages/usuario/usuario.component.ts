import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MensajeI } from 'src/app/model/mensajei';
import { UsuarioI } from 'src/app/model/usuarioi';
import { StorageService } from 'src/app/service/storage.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DialogComponent } from '../dialog/dialog.component';
import { UsuariotecleoComponent } from './usuariotecleo/usuariotecleo.component';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  _Datos: UsuarioI[]=[];

  constructor(private storageService:StorageService,public usuarioService:UsuarioService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.storageService.setTitelNavBar("Usuario");
    this.buscar();
   }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'telefono','direccion','acciones'];
  dataSource = new MatTableDataSource(this._Datos);
  
  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  buscar(){
    this.usuarioService.listar().subscribe(data =>{
      //console.log(data);
      this._Datos = data;
      this.dataSource = new MatTableDataSource(this._Datos);
      
    })
  }

  openDialog(data?: UsuarioI) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
   
    const dialogRef = this.dialog.open(UsuariotecleoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (confirmDialog: boolean) => {
        if(confirmDialog){
          this.snackBar.open('Registro creada correctamente', 'Aceptar', {
            duration: 2000,
          });
          this.buscar()
        }
      }
    );
  }



  eliminar(data: UsuarioI) {

    let mensaje: MensajeI={titulo: "Eliminar",mensaje:"¿Esta seguro que desea eliminar el registro?. Ya no podra recuperarlo."}

    this.dialog
    .open(DialogComponent, {
      data: mensaje
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.usuarioService.eliminar(data.id).subscribe(data => {
       
          this.snackBar.open('Registro eliminado correctamente', 'Aceptar', {
            duration: 2000,
          });
          this.buscar();
        })
      } 
    });

  }

}
