import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrararticulosvendidos'
})
export class FiltrararticulosvendidosPipe implements PipeTransform {

  transform(articulos: any[], texto: string): any[] {
    if (!texto) return articulos;
    texto = texto.toLowerCase();

    return articulos.filter(articulo => {
      return articulo.key.toLowerCase().includes(texto);
    });
  }

}
