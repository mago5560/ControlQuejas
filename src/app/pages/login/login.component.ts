import { Component, OnInit,Output, ViewChild,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessionI } from 'src/app/model/sessioni';
import { LoginService } from 'src/app/service/login.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  public submitted: Boolean = false;
  frm!: FormGroup;

  constructor( private router: Router, private storageService:StorageService,private loginService:LoginService
    , public formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.frm = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      contra: ['', [Validators.required]]
    });
  }

  ingresar(){
    if(this.frm.valid){
        this.loginService.login(this.frm?.get("usuario")?.value, this.frm?.get("contra")?.value).subscribe(data=>{
          let token =  JSON.stringify( data );
          let loginSession = new SessionI();
          loginSession  = JSON.parse(token);
          this.correctLogin(loginSession);
        }, error =>{
          this.snackBar.open('error al iniciar, verifique','Aceptar', {
            duration: 2000,
          });
        })
    }
  }


  private correctLogin(data: SessionI){
    this.storageService.setCurrentSession(data);
    this.router.navigate(['/home']);
  }

}
