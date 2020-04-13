import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MarcasService } from 'src/app/services/marcas.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  constructor(public marcasServ: MarcasService) { }
  @ViewChild('btnClose') btnClose: ElementRef;

  ngOnInit(): void {
  }

  saveMarca(marcaForm: NgForm): void {
    if(marcaForm.value.id == null){
      //nuevo
      this.marcasServ.addMarca(marcaForm.value);
    }else{
      this.marcasServ.updateMarca(marcaForm.value);
    }
    marcaForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
