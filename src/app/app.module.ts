import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MaterialModule } from './material/material.module';
import { QuejaComponent } from './pages/queja/queja.component';
import { LoginComponent } from './pages/login/login.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { FooterComponent } from './pages/footer/footer.component';
import { RegionComponent } from './pages/region/region.component';
import { RegiontecleoComponent } from './pages/region/regiontecleo/regiontecleo.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { DepartamentotecleoComponent } from './pages/departamento/departamentotecleo/departamentotecleo.component';
import { MunicipioComponent } from './pages/municipio/municipio.component';
import { MunicipiotecleoComponent } from './pages/municipio/municipiotecleo/municipiotecleo.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuariotecleoComponent } from './pages/usuario/usuariotecleo/usuariotecleo.component';
import { EncargadoComponent } from './pages/encargado/encargado.component';
import { EncargadotecleoComponent } from './pages/encargado/encargadotecleo/encargadotecleo.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './pages/dialog/dialog.component';
import { ComercioComponent } from './pages/comercio/comercio.component';
import { ComerciotecleoComponent } from './pages/comercio/comerciotecleo/comerciotecleo.component';
import { SucursaltecleoComponent } from './pages/comercio/sucursaltecleo/sucursaltecleo.component';


@NgModule({
  declarations: [
    AppComponent,
    QuejaComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    RegionComponent,
    DepartamentoComponent,
    MunicipioComponent,
    UsuarioComponent,
    UsuariotecleoComponent,
    EncargadotecleoComponent,
    MunicipiotecleoComponent,
    DepartamentotecleoComponent,
    RegiontecleoComponent,
    EncargadoComponent,
    DialogComponent,
    ComercioComponent,
    ComerciotecleoComponent,
    SucursaltecleoComponent
  ],
  imports: [
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
    //para que en el server respete la ruta asignada.  {provide: LocationStrategy, useClass: HashLocationStrategy}
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
