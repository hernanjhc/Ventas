import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/models/rubro';
import { from } from 'rxjs';
import { RubrosService } from 'src/app/services/rubros.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.css']
})
export class RubrosComponent implements OnInit {

  constructor(public rubrosServ: RubrosService) { }

  public rubros: Rubro[];
  filterRubros = '';
  pageActual: number = 1;

  ngOnInit(): void {
    this.getRubros();
  }

  getRubros(){
    this.rubrosServ.getRubros()
    .subscribe(rubros => {
      this.rubros = rubros;
      console.log('rubro',this.rubros);
    })
  }

  deleteRubro(idRubro: string): void{
    const confirmacion = confirm('Desea eliminar el Rubro?');
    if(confirmacion) {
      this.rubrosServ.deleteRubro(idRubro);
    };
    this.getRubros();
  }

  saveRubro(rubroForm: NgForm): void {
    if (rubroForm.value.id == null) {
      this.rubrosServ.addRubro(rubroForm.value);
      console.log(rubroForm.value);
    }else{
      this.rubrosServ.updateRubro(rubroForm.value);
    }
  }

  PreUpdateRubro(rubro: Rubro) {
    this.rubrosServ.selectedRubro = Object.assign({}, rubro);
  }

}
