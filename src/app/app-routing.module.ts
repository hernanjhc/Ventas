import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListadoComponent } from './components/clientes/listado/listado.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NuevoComponent } from './components/clientes/nuevo/nuevo.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Home', component: HomeComponent},
  {path: 'Clientes', component: ListadoComponent},
  {path: 'NuevoCliente/:id', component: NuevoComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 