import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Proveedor } from 'src/app/models/proveedor';

@Injectable({
  providedIn: 'root'
})

export class ProveedoresService {

  constructor(private afs: AngularFirestore) {
    this.proveedoresCollection = afs.collection<Proveedor>('proveedores');
    this.proveedores = this.proveedoresCollection.valueChanges();
   }

   private proveedoresCollection: AngularFirestoreCollection<Proveedor>;
   private proveedores: Observable<Proveedor[]>;
   private proveedorDoc: AngularFirestoreDocument<Proveedor>;
   private proveedor: Observable<Proveedor>; 
   public selectedProveedor: Proveedor = {
     id: null
   };



   getProveedores() {
    this.proveedoresCollection = this.afs.collection<Proveedor>('proveedores');
    return this.proveedores = this.proveedoresCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Proveedor;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }


  /* addCliente(cliente: Cliente): void {
    this.clientesCollection.add(cliente);
  } */


  addProveedor(proveedor: Proveedor): void {
    this.proveedoresCollection.add(
      { 
        tipoDocumento: proveedor.tipoDocumento,
        nroDocumento: proveedor.nroDocumento,
        razonSocial: proveedor.razonSocial,
        condIVA: proveedor.condIVA ?? '',
        telefono: proveedor.telefono ?? '',
        celular: proveedor.telefono ?? '',
        email: proveedor.email ?? '',
        direccion: proveedor.direccion ?? '',
        codPostal: proveedor.codPostal ?? '',
        estado: 'Activo'       
      }
    );
  }

  deleteProveedor(idProveedor: string): void {
    this.proveedorDoc = this.afs.doc<Proveedor>(`proveedores/${idProveedor}`);    
    this.proveedorDoc.delete();
  }

  updateProveedor(proveedor: Proveedor): void {
    let idProveedor = proveedor.id;
    this.proveedorDoc = this.afs.doc<Proveedor>(`proveedores/${idProveedor}`);
    this.proveedorDoc.update(proveedor);
  } 

}

