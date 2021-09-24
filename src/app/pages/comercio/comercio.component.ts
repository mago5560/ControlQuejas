import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ComercioI } from 'src/app/model/comercioi';
import { MensajeI } from 'src/app/model/mensajei';
import { ComercioService } from 'src/app/service/comercio.service';
import { StorageService } from 'src/app/service/storage.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ComerciotecleoComponent } from './comerciotecleo/comerciotecleo.component';
import { SucursaltecleoComponent } from './sucursaltecleo/sucursaltecleo.component';

@Component({
  selector: 'app-comercio',
  templateUrl: './comercio.component.html',
  styleUrls: ['./comercio.component.css']
})
export class ComercioComponent implements OnInit {

  
  _Datos: ComercioI[]=[];

  constructor(private storageService:StorageService,public service:ComercioService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.storageService.setTitelNavBar("Comercio");
    this.buscar();
   }
  ngOnInit(): void {
  }

  
  displayedColumns: string[] = ['id', 'nombre', 'municipio','encargado','sucursal','acciones'];
  dataSource = new MatTableDataSource(this._Datos);
  
  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  buscar(){
    this.service.listar().subscribe(data =>{
      this._Datos = data;
      this.dataSource = new MatTableDataSource(this._Datos);
    })
  }

  openDialog(data?: ComercioI): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
   
    const dialogRef = this.dialog.open(ComerciotecleoComponent, dialogConfig);

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

  openDialogSucursal(data:ComercioI){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
   
    const dialogRef = this.dialog.open(SucursaltecleoComponent, dialogConfig);

  }

  

  eliminar(data: ComercioI) {

    let mensaje: MensajeI={titulo: "Eliminar",mensaje:"¿Esta seguro que desea eliminar el registro?. Ya no podra recuperarlo."}

    this.dialog
    .open(DialogComponent, {
      data: mensaje
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.service.eliminar(data.id).subscribe(data => {
       
          this.snackBar.open('Registro eliminado correctamente', 'Aceptar', {
            duration: 2000,
          });
          this.buscar();
        })
      } 
    });

  }
}
