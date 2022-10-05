import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarmesas'
})
export class FiltrarmesasPipe implements PipeTransform {

  transform(value: any, arg: any[]): any {
    const filtrarmesas = [];
    for(const Mesas of value){
      if (Mesas.numeroMesa.indexOf(arg) > -1){
        filtrarmesas.push(Mesas);
      };
    };
    return filtrarmesas;
  }

}
