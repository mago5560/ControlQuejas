import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EncargadoI } from 'src/app/model/encargadoi';
import { MensajeI } from 'src/app/model/mensajei';
import { EncargadoService } from 'src/app/service/encargado.service';
import { StorageService } from 'src/app/service/storage.service';
import { DialogComponent } from '../dialog/dialog.component';
import { EncargadotecleoComponent } from './encargadotecleo/encargadotecleo.component';

@Component({
  selector: 'app-encargado',
  templateUrl: './encargado.component.html',
  styleUrls: ['./encargado.component.css']
})
export class EncargadoComponent implements OnInit {

  _Datos: EncargadoI[]=[];

  constructor(private storageService:StorageService,public service:EncargadoService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.storageService.setTitelNavBar("Encargado");
    this.buscar();
   }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['id', 'nombre', 'apellido','dpi', 'telefono','direccion','activo','acciones'];
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

  openDialog(data?: EncargadoI) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
   
    const dialogRef = this.dialog.open(EncargadotecleoComponent, dialogConfig);

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



  eliminar(data: EncargadoI) {

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
