import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TemplateComponent } from './components/template/template.component';
import { ListadoComponent } from './components/clientes/listado/listado.component';
/* import { NuevoComponent } from './components/clientes/nuevo/nuevo.component'; */
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';


import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProveedoresComponent } from './components/proveedores/proveedores/proveedores.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MarcasComponent } from './components/marcas/marcas/marcas.component';
import { NuevoComponent } from './components/marcas/nuevo/nuevo.component';
import { UnidadesComponent } from './components/unidades/unidades/unidades.component';
import { NuevaUnidadComponent } from './components/unidades/nueva-unidad/nueva-unidad.component';
import { RubrosComponent } from './components/rubros/rubros/rubros.component';
import { NuevoRubroComponent } from './components/rubros/nuevo-rubro/nuevo-rubro.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TemplateComponent,
    ListadoComponent,
    /* NuevoComponent, */
    NotFoundComponent,
    FilterPipe,
    ProveedoresComponent,
    LoginComponent,
    RegistroComponent,
    MarcasComponent,
    NuevoComponent,
    UnidadesComponent,
    NuevaUnidadComponent,
    RubrosComponent,
    NuevoRubroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxPaginationModule,
    AngularFireAuthModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
