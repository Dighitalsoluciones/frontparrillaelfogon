import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MovimientoStock } from 'src/app/Model/movimiento-stock';
import { MovimientoStockService } from 'src/app/Service/movimiento-stock.service';

@Component({
  selector: 'app-consulta-stock',
  templateUrl: './consulta-stock.component.html',
  styleUrls: ['./consulta-stock.component.css']
})
export class ConsultaStockComponent implements OnInit {

  startDate: Date;
  endDate: Date;
  fechaHastaMin: Date;
  fechaInicioMax: Date;

  totalArticulosVendidos: number = 0;
  movimientosStock: MovimientoStock[] = []

  constructor(private serviceMovimientoStock: MovimientoStockService) { }

  ngOnInit(): void {
  }

  traerListaMovimientoStockFiltrados() {
    this.serviceMovimientoStock.lista().subscribe(data => {
      this.movimientosStock = data;
      this.filtrarPorFecha();
    })
  }

  filtrarPorFecha(): void {
    let formato = 'YYYY-MM-DD'; // Define el formato de la fecha

    let start = moment(this.startDate, formato);
    let end = moment(this.endDate, formato).endOf('day'); // Ajusta la hora al final del día

    this.movimientosStock = this.movimientosStock.filter(movimiento => {
      let fechaMovimiento = moment(movimiento.fecha, formato);

      // Compara solo la fecha, sin la hora
      return fechaMovimiento.isSameOrAfter(start) && fechaMovimiento.isSameOrBefore(end);
    });
  }

  updateFechaHastaMin() {
    this.fechaHastaMin = this.startDate;
  }

  updateFechaInicioMax() {
    this.fechaInicioMax = this.endDate;
  }

}
