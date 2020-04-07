import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/models/cliente';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  constructor(public clientesServ: ClientesService) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  public clientes: Cliente[];

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(){
    this.clientesServ.getClientes()
    .subscribe(clientes => {
      this.clientes = clientes;
      console.log('cliente', this.clientes);
    })
   
  }

  deleteCliente(idCliente: string): void {
    const confirmacion = confirm('Desea eliminar el Cliente?');
    if (confirmacion) {
      this.clientesServ.deleteCliente(idCliente);
    }
  }

  saveCliente(clienteForm: NgForm): void {
    if (clienteForm.value.id == null) {
      // New 
      
      this.clientesServ.addCliente(clienteForm.value);
      console.log(clienteForm.value);
    } else {
      // Update
      this.clientesServ.updateCliente(clienteForm.value);
    }
    clienteForm.resetForm();
    this.btnClose.nativeElement.click();
  }

  PreUpdateCliente(cliente: Cliente) {
    /* console.log('CLIENTE', cliente); */
    this.clientesServ.selectedCliente = Object.assign({}, cliente);
  }
  
}
