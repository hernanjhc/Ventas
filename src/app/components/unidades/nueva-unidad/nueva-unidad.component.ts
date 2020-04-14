import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UnidadesService } from 'src/app/services/unidades.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nueva-unidad',
  templateUrl: './nueva-unidad.component.html',
  styleUrls: ['./nueva-unidad.component.css']
})
export class NuevaUnidadComponent implements OnInit {

  constructor(public unidadesServ: UnidadesService) { }
  @ViewChild('btnClose') btnClose: ElementRef;

  ngOnInit(): void {
  }

  saveUnidad(unidadForm: NgForm): void {
    if(unidadForm.value.id == null){
      //nuevo
      this.unidadesServ.addUnidad(unidadForm.value);
    }else{
      this.unidadesServ.updateUnidad(unidadForm.value);
    }
    unidadForm.resetForm();
    this.btnClose.nativeElement.click();
  }


}
