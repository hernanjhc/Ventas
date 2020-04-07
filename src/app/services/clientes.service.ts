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
  private clienteDoc: AngularFirestoreDocument<Cliente>;
  private cliente: Observable<Cliente>; 
  public selectedCliente: Cliente = {
    id: null
  };

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


  /* addCliente(cliente: Cliente): void {
    this.clientesCollection.add(cliente);
  } */

  addCliente(cliente: Cliente): void {
    this.clientesCollection.add(
      { /*  id?: string; */
        tipoDocumento: cliente.tipoDocumento,
        nroDocumento: cliente.nroDocumento,
        razonSocial: cliente.razonSocial,
        condIVA: cliente.condIVA ?? '',
        telefono: cliente.telefono ?? '',
        celular: cliente.telefono ?? '',
        email: cliente.email ?? '',
        direccion: cliente.direccion ?? '',
        codPostal: cliente.codPostal ?? '',
        estado: 'Activo'       
      }
    );
  }
  deleteCliente(idCliente: string): void {
    this.clienteDoc = this.afs.doc<Cliente>(`clientes/${idCliente}`);    
    this.clienteDoc.delete();
    /* console.log('cliente', idCliente); */
  }

  updateCliente(cliente: Cliente): void {
    let idCliente = cliente.id;
    this.clienteDoc = this.afs.doc<Cliente>(`clientes/${idCliente}`);
    this.clienteDoc.update(cliente);
  }

}
