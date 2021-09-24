import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from './guard/authorization.guard';
import { ComercioComponent } from './pages/comercio/comercio.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { EncargadoComponent } from './pages/encargado/encargado.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MunicipioComponent } from './pages/municipio/municipio.component';
import { QuejaComponent } from './pages/queja/queja.component';
import { RegionComponent } from './pages/region/region.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

const routes: Routes = [
  {path: 'usuario',component:UsuarioComponent,canActivate:[AuthorizationGuard]},
  {path: 'comercio',component:ComercioComponent,canActivate:[AuthorizationGuard]},
  {path: 'encargado',component:EncargadoComponent,canActivate:[AuthorizationGuard]},
  {path: 'municipio',component:MunicipioComponent,canActivate:[AuthorizationGuard]},
  {path: 'departamento',component:DepartamentoComponent,canActivate:[AuthorizationGuard]},
  {path: 'region',component:RegionComponent,canActivate:[AuthorizationGuard]},
  {path: 'home',component:HomeComponent,canActivate:[AuthorizationGuard]},
  {path: 'queja',component:QuejaComponent},
  {path: 'login',component:LoginComponent},
  {path: '', redirectTo: '/queja', pathMatch: 'full' },
  {path: '**', redirectTo: '/queja' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
