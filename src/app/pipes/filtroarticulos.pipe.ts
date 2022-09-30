import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroarticulos'
})
export class FiltroarticulosPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
