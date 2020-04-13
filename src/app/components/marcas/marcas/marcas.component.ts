import { Component, OnInit, ViewChild } from '@angular/core';
import { MarcasService } from 'src/app/services/marcas.service';
import { Marca } from 'src/app/models/marca';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  constructor(public marcasServ: MarcasService) { }
  
  public marcas: Marca[];
  filterMarcas = '';
  pageActual: number = 1;

  ngOnInit(): void {
    this.getMarcas();
  }

  getMarcas(){
    this.marcasServ.getMarcas()
    .subscribe(marcas => {
      this.marcas = marcas;
      console.log('marca', this.marcas);
    })
  }

  deleteMarca(idMarca: string): void {
    const confirmacion = confirm('Desea eliminar la Marca?');
    if(confirmacion) {
      this.marcasServ.deleteMarca(idMarca);
    };
    this.getMarcas();
  }

  saveMarca(marcaForm: NgForm): void {
    if (marcaForm.value.id == null) {
      this.marcasServ.addMarca(marcaForm.value);
      console.log(marcaForm.value);
    }else{
      this.marcasServ.updateMarca(marcaForm.value);
    }
  }

  PreUpdateMarca(marca: Marca) {
    this.marcasServ.selectedMarca = Object.assign({}, marca);
  }

}
