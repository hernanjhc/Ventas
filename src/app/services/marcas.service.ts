import { Injectable } from '@angular/core';
import { Marca } from 'src/app/models/marca';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  constructor(private afs: AngularFirestore) {
    this.marcasCollection = afs.collection<Marca>('marcas');
    this.marcas = this.marcasCollection.valueChanges();
   }

   private marcasCollection: AngularFirestoreCollection<Marca>;
   private marcaDoc:  AngularFirestoreDocument<Marca>;
   private marcas: Observable<Marca[]>;
   public selectedMarca: Marca = {
     id: null
   };

   getMarcas(){
     this.marcasCollection = this.afs.collection<Marca>('marcas');
     return this.marcas = this.marcasCollection.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as Marca;
         data.id = action.payload.doc.id;
         return data;
       });
     }));
   }

   addMarca(marca: Marca): void{
     this.marcasCollection.add({
      descripcion: marca.descripcion,
      observaciones: marca.observaciones,
      estado: 'Activo' 
     });
   }

   deleteMarca(idMarca: string): void {
     this.marcaDoc = this.afs.doc<Marca>(`marcas/${idMarca}`);
     this.marcaDoc.delete();
   }

   updateMarca(marca: Marca): void {
     let idMarca = marca.id;
     this.marcaDoc = this.afs.doc<Marca>(`marcas/${idMarca}`);
     this.marcaDoc.update(marca);
   }

}
