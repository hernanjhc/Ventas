import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListadoComponent } from './components/clientes/listado/listado.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProveedoresComponent } from './components/proveedores/proveedores/proveedores.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MarcasComponent } from './components/marcas/marcas/marcas.component';
import {NuevoComponent} from './components/marcas/nuevo/nuevo.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Home', component: HomeComponent},
  {path: 'Clientes', component: ListadoComponent},
  {path: 'Proveedores', component: ProveedoresComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Registro', component: RegistroComponent},  
  {path: 'Marcas', component: MarcasComponent},
  {path: 'Marcas/Nuevo', component: NuevoComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 