import { Component, OnInit } from '@angular/core';
import { Articulos } from 'src/app/Model/articulos';
import { MovimientoStock } from 'src/app/Model/movimiento-stock';
import { ArticulosService } from 'src/app/Service/articulos.service';
import { CompartidoService } from 'src/app/Service/compartido.service';
import { MovimientoStockService } from 'src/app/Service/movimiento-stock.service';

@Component({
  selector: 'app-stock-screen',
  templateUrl: './stock-screen.component.html',
  styleUrls: ['./stock-screen.component.css']
})
export class StockScreenComponent implements OnInit {

  articulos: Articulos[] = [];
  observacion: string = '';
  fecha: Date = new Date();
  opciones: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  fechaFormateada: string = this.fecha.toLocaleDateString('es-AR', this.opciones);
  proximoMovimientoStock: number = 0;

  listadoItem: string = '';

  constructor(private serviceCompartido: CompartidoService, private serviceMovimientoStock: MovimientoStockService,
    private serviceArticulo: ArticulosService) {
    this.serviceCompartido.currentData.subscribe(data => this.articulos = data)
  }

  ngOnInit(): void {
    this.traerProximoMovimientoStock();
  }

  traerProximoMovimientoStock() {
    this.serviceMovimientoStock.getNextId().subscribe(data => {
      this.proximoMovimientoStock = data;
    })
  }

  eliminarPorId(id: number) {
    for (let i = 0; i < this.articulos.length; i++) {
      if (this.articulos[i].id === id) {
        this.articulos.splice(i, 1);
        this.articulos.filter(articulo => articulo.cantidad !== 0);
        break;
      }
    }
  }

  disminuirCantidadPorId(id: number) {
    for (let i = 0; i < this.articulos.length; i++) {
      if (this.articulos[i].id === id && this.articulos[i].cantidad > 0) {
        this.articulos[i].cantidad -= 1;
        // Si la cantidad es 0, eliminar el artículo
        if (this.articulos[i].cantidad === 0) {
          this.articulos.splice(i, 1);
        }

        break;
      }
    }
  }

  onCreateMovimientoStock(): void {
    this.listadoItem = JSON.stringify(this.articulos, ['id', 'nombre', 'cantidad']);
    const movimientoStock = new MovimientoStock(this.listadoItem, this.fecha, this.observacion);
    this.serviceMovimientoStock.save(movimientoStock).subscribe(
      data => {
        alert("✅ Moviento de Stock generado correctamente");
        this.saveStock();
      }, err => {
        alert("⛔Fallo en la creación del Movimiento de Stock ⛔");
      }
    )
  }

  saveStock() {
    let updatePromises = []; // Array para guardar todas las promesas

    for (let item of this.articulos) {
      let updatePromise = new Promise<void>((resolve, reject) => {
        this.serviceArticulo.details(item.id).subscribe(
          data => {
            let nuevoStock = data.stock + item.cantidad;
            data.stock = nuevoStock;
            this.serviceArticulo.update(item.id, data).subscribe(
              data => {
                console.log('Stock actualizado con éxito');
                resolve(); // Resuelve la promesa cuando la actualización es exitosa
              },
              error => {
                console.error('Error actualizando el stock', error);
                reject(); // Rechaza la promesa si hay un error
              }
            );
          },
          error => {
            console.error('Error obteniendo el artículo', error);
            reject(); // Rechaza la promesa si hay un error
          }
        );
      });

      updatePromises.push(updatePromise); // Agrega la promesa al array
    }

    // Espera a que todas las promesas se resuelvan antes de recargar la página
    Promise.all(updatePromises).then(() => location.reload());
  }

  vaciarDatos() {
    this.articulos = [];
  }

}
