import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultClientes = [];
    for (const cliente of value) {
      if (cliente.razonSocial.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultClientes.push(cliente);
      };
    };
    return resultClientes;
  }

}
