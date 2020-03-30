import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private afs: AngularFirestore) { 
    this.clientesCollection = afs.collection<Cliente>('clientes');
    this.clientes = this.clientesCollection.valueChanges();
  }

  private clientesCollection: AngularFirestoreCollection<Cliente>;
  private clientes: Observable<Cliente[]>;
  /* private solicitudDoc: AngularFirestoreDocument<Solicitud>;
  private solicitud: Observable<Solicitud>; */
  /* public selectedSolicitud: Solicitud = {
    id: null
  }; */

  getClientes() {
    this.clientesCollection = this.afs.collection<Cliente>('clientes');
    return this.clientes = this.clientesCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Cliente;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  addCliente(cliente: Cliente): void {
    this.clientesCollection.add(cliente);
  }

}
