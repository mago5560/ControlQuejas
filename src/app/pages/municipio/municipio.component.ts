import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MensajeI } from 'src/app/model/mensajei';
import { MunicipioI } from 'src/app/model/municipioi';
import { MunicipioService } from 'src/app/service/municipio.service';
import { StorageService } from 'src/app/service/storage.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MunicipiotecleoComponent } from './municipiotecleo/municipiotecleo.component';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.css']
})
export class MunicipioComponent implements OnInit {

  _Datos: MunicipioI[]=[];

  constructor(private storageService:StorageService,public service:MunicipioService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.storageService.setTitelNavBar("Municipio");
    this.buscar();
   }
  ngOnInit(): void {
  }

  
  displayedColumns: string[] = ['id', 'nombre', 'departamento','acciones'];
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

  openDialog(data?: MunicipioI): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
   
    const dialogRef = this.dialog.open(MunicipiotecleoComponent, dialogConfig);

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



  eliminar(data: MunicipioI) {

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
