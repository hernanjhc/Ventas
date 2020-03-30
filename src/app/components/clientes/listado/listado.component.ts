import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  constructor(private clientesServ: ClientesService) { }
  public clientes: Cliente[];

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(){
    this.clientesServ.getClientes()
    .subscribe(clientes => {
      this.clientes = clientes;
    })
    console.log('cliente', this.clientes);
  }
}
