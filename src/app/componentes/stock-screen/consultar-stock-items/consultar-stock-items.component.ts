import { Component, OnInit } from '@angular/core';
import { Articulos } from 'src/app/Model/articulos';
import { ArticulosService } from 'src/app/Service/articulos.service';

@Component({
  selector: 'app-consultar-stock-items',
  templateUrl: './consultar-stock-items.component.html',
  styleUrls: ['./consultar-stock-items.component.css']
})
export class ConsultarStockItemsComponent implements OnInit {

  articulos: Articulos[] = [];

  articulosFiltrados = [];

  //Para usar en la busqueda con el pipe
  textoFiltro = [];

  lista = ["TODOS", "BAJO PUNTO DE REPOSICION", "SIN STOCK"];

  constructor(private serviceArticulos: ArticulosService) { }

  ngOnInit(): void {
    this.traerListadoArticulos();
  }

  traerListadoArticulos() {
    this.serviceArticulos.lista().subscribe(data => {
      this.articulos = data.map(articulo => ({
        ...articulo,
        isTrazable: Boolean(articulo.isTrazable)
      }));
      this.articulosFiltrados = [...this.articulos];
    })
  }

  filtrarArticulos(event: any) {
    const filtro = (event.target as HTMLSelectElement).value;
    switch (filtro) {
      case 'TODOS':
        this.articulosFiltrados = this.articulos;
        break;
      case 'BAJO PUNTO DE REPOSICION':
        this.articulosFiltrados = this.articulos.filter(articulo => articulo.stock <= articulo.puntorepo);
        break;
      case 'SIN STOCK':
        this.articulosFiltrados = this.articulos.filter(articulo => articulo.stock === 0);
        break;
      default:
        this.articulosFiltrados = this.articulos;
    }
  }

}
