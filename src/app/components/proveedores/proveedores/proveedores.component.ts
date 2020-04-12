import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Proveedor } from 'src/app/models/proveedor';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  constructor(public proveedoresServ: ProveedoresService) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  public proveedores: Proveedor[];
  filterProveedores = '';
  pageActual: number = 1;

  ngOnInit(): void {
    this.getProveedores();
  }

  getProveedores(){
    this.proveedoresServ.getProveedores()
    .subscribe(proveedores => {
      this.proveedores = proveedores;
      console.log('proveedor', this.proveedores);
    })
   
  }

  deleteProveedor(idProveedor: string): void {
    const confirmacion = confirm('Desea eliminar el Proveedor?');
    if (confirmacion) {
      this.proveedoresServ.deleteProveedor(idProveedor);
    }
  }

  saveProveedor(proveedorForm: NgForm): void {
    if (proveedorForm.value.id == null) {
      // New 
      
      this.proveedoresServ.addProveedor(proveedorForm.value);
      console.log(proveedorForm.value);
    } else {
      // Update
      this.proveedoresServ.updateProveedor(proveedorForm.value);
    }
    proveedorForm.resetForm();
    this.btnClose.nativeElement.click();
  }

  PreUpdateProveedor(proveedor: Proveedor) {
    this.proveedoresServ.selectedProveedor = Object.assign({}, proveedor);
  }

}
