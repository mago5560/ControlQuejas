import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegionI } from 'src/app/model/regioni';
import { RegionService } from 'src/app/service/region.service';

@Component({
  selector: 'app-regiontecleo',
  templateUrl: './regiontecleo.component.html',
  styleUrls: ['./regiontecleo.component.css']
})
export class RegiontecleoComponent implements OnInit {

  public submitted: Boolean = false;
  frm!: FormGroup;

  ID!:number;
  tituloForm: String="";
  _data?: RegionI;


  constructor(private dialogRef: MatDialogRef<RegiontecleoComponent>
    , @Inject(MAT_DIALOG_DATA) public data: RegionI
    , private api : RegionService
    , public formBuilder: FormBuilder) { 
      this._data = this.data;
    }

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });

    if(this._data){  
      this.ID = this._data.id; 
      this.frm?.get("nombre")?.setValue( this._data.nombre);
      this.frm?.get("descripcion")?.setValue( this._data.descripcion);   
      this.tituloForm ="Modificar Region" ;
    }else{
      this.tituloForm ="Grabar Region";
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
          descripcion: this.frm?.get("descripcion")?.value
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
