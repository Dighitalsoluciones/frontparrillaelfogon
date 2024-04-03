import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroarticulos'
})
export class FiltroarticulosPipe implements PipeTransform {

  transform(value: any, arg: any[]): any {
    const filtroarticulos = [];
    for (const Articulos of value) {
      if (Articulos.nombre.toLowerCase().indexOf(arg) > -1 || Articulos.nombre.toUpperCase().indexOf(arg) > -1) {
        filtroarticulos.push(Articulos);
      };
    };
    return filtroarticulos;
  }

}
