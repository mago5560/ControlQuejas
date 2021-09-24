import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DepartamentoI } from 'src/app/model/departamentoi';
import { MensajeI } from 'src/app/model/mensajei';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { StorageService } from 'src/app/service/storage.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DepartamentotecleoComponent } from './departamentotecleo/departamentotecleo.component';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

 
  _Datos: DepartamentoI[]=[];

  constructor(private storageService:StorageService,public service:DepartamentoService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.storageService.setTitelNavBar("Departamento");
    this.buscar();
   }
  ngOnInit(): void {
  }

  
  displayedColumns: string[] = ['id', 'nombre', 'region','acciones'];
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

  openDialog(data?: DepartamentoI): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
   
    const dialogRef = this.dialog.open(DepartamentotecleoComponent, dialogConfig);

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



  eliminar(data: DepartamentoI) {

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
