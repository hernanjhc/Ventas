import { Component, OnInit } from '@angular/core';
import { Unidad } from 'src/app/models/unidad';
import { UnidadesService } from 'src/app/services/unidades.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  constructor(public unidadesServ: UnidadesService) { }

  public unidades: Unidad[];
  filterUnidades = '';
  pageActual: number = 1;

  ngOnInit(): void {
    this.getUnidades();
  }

  getUnidades(){
    this.unidadesServ.getUnidades()
    .subscribe(unidades => {
      this.unidades = unidades;
      console.log('unidad', this.unidades);
    })
  }

  deleteUnidad(idUnidad: string): void{
    const confirmacion = confirm('Desea eliminar la Unidad');
    if(confirmacion) {
      this.unidadesServ.deleteUnidad(idUnidad);
    }
    this.getUnidades();
  }

  saveUnidad(unidadForm: NgForm): void {
    if (unidadForm.value.id == null) {
      this.unidadesServ.addUnidad(unidadForm.value);
      console.log(unidadForm.value);
    }else{
      this.unidadesServ.updateUnidad(unidadForm.value);
    }
  }

  PreUpdateUnidad(unidad: Unidad) {
    this.unidadesServ.selectedUnidad = Object.assign({}, unidad);
  }
  
}
