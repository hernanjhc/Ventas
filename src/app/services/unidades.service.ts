import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Unidad } from '../models/unidad';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  constructor(private afs: AngularFirestore) { 
    this.unidadesCollection = afs.collection<Unidad>('unidades');
    this.unidades = this.unidadesCollection.valueChanges();
  }

  private unidadesCollection: AngularFirestoreCollection<Unidad>;
  private unidadDoc: AngularFirestoreDocument<Unidad>;
  private unidades: Observable<Unidad[]>;
  public selectedUnidad: Unidad = {
    id: null
  }

  getUnidades(){
    this.unidadesCollection = this.afs.collection<Unidad>('unidades');
    return this.unidades = this.unidadesCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Unidad;
        data.id = action.payload.doc.id;
        return data;
        });        
      }));
  }

  addUnidad(unidad: Unidad): void {
    this.unidadesCollection.add({
      descripcion: unidad.descripcion,
      observaciones: unidad.observaciones,
      estado: 'Activo'
    });
  }

  deleteUnidad(idUnidad: string): void {
    this.unidadDoc = this.afs.doc<Unidad>(`unidades/${idUnidad}`);
    this.unidadDoc.delete();
  }

  updateUnidad(unidad: Unidad): void {
    let idUnidad = unidad.id;
    this.unidadDoc = this.afs.doc<Unidad>(`unidades/${idUnidad}`);
    this.unidadDoc.update(unidad);
  }
}
