import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPorCodigo'
})
export class FiltroPorCodigoPipe implements PipeTransform {
  
  transform(value: any, arg: any[]): any {
    const filtroPorCodigo = [];
    for (const Articulos of value) {
      if (Articulos.id) {
        if (Articulos.id.toLowerCase().indexOf(arg) > -1 || Articulos.id.toUpperCase().indexOf(arg) > -1) {
          filtroPorCodigo.push(Articulos);
        };
      }
    };
    return filtroPorCodigo;
  }

}
