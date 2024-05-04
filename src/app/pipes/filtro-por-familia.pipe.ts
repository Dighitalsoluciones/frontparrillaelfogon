import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPorFamilia'
})
export class FiltroPorFamiliaPipe implements PipeTransform {

  transform(value: any, arg: any[]): any {
    const filtroPorFamilia = [];
    for (const Articulos of value) {
      if (Articulos.familia) {
        if (Articulos.familia.toLowerCase().indexOf(arg) > -1 || Articulos.familia.toUpperCase().indexOf(arg) > -1) {
          filtroPorFamilia.push(Articulos);
        };
      }
    };
    return filtroPorFamilia;
  }
}
