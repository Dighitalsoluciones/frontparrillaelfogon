import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPorNombre'
})
export class FiltroPorNombrePipe implements PipeTransform {

  transform(value: any, arg: any[]): any {
    const filtroPorNombre = [];
    for (const Articulos of value) {
      if (Articulos.nombre) {
        if (Articulos.nombre.toLowerCase().indexOf(arg) > -1 || Articulos.nombre.toUpperCase().indexOf(arg) > -1) {
          filtroPorNombre.push(Articulos);
        };
      }
    };
    return filtroPorNombre;
  }

}
