import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarmesas'
})
export class FiltrarmesasPipe implements PipeTransform {

  transform(value: any, arg: any[]): any {
    const filtroMesas = [];
    for(const Mesas of value){
      if (Mesas.id.toLowerCase().indexOf(arg) > -1){
        filtroMesas.push(Mesas);
      };
    };
    return filtroMesas;
  }

}
