import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RubrosService } from 'src/app/services/rubros.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nuevo-rubro',
  templateUrl: './nuevo-rubro.component.html',
  styleUrls: ['./nuevo-rubro.component.css']
})
export class NuevoRubroComponent implements OnInit {

  constructor(public rubrosServ: RubrosService) { }
  @ViewChild('btnClose') btnClose: ElementRef;

  ngOnInit(): void {
  }

  saveRubro(rubroForm: NgForm): void {
    if(rubroForm.value.id == null){
      //nuevo
      this.rubrosServ.addRubro(rubroForm.value);
    }else{
      this.rubrosServ.updateRubro(rubroForm.value);
    }
    rubroForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
