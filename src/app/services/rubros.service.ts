import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Rubro} from '../models/rubro';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {

  constructor(private afs: AngularFirestore) {
    this.rubrosCollection = afs.collection<Rubro>('rubros');
    this.rubros = this.rubrosCollection.valueChanges();
   }

  private rubrosCollection:AngularFirestoreCollection<Rubro>;
  private rubroDoc: AngularFirestoreDocument<Rubro>;
  private rubros: Observable<Rubro[]>;
  public selectedRubro: Rubro = {
    id:  null
  };

  getRubros(){
    this.rubrosCollection = this.afs.collection<Rubro>('rubros');
    return this.rubros = this.rubrosCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Rubro;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  addRubro(rubro: Rubro): void{
    this.rubrosCollection.add({
      descripcion: rubro.descripcion,
      observaciones: rubro.observaciones,
      estado: 'Activo'
    });
  }

  deleteRubro(idRubro : string): void{
    this.rubroDoc = this.afs.doc<Rubro>(`rubros/${idRubro}`);
    this.rubroDoc.delete();
  }

  updateRubro(rubro: Rubro): void{
    let idRubro = rubro.id;
    this.rubroDoc = this.afs.doc<Rubro>(`rubros/${idRubro}`);
    this.rubroDoc.update(rubro);
  }

}
