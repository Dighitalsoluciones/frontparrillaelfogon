import { Component, OnInit } from '@angular/core';
import { ArticulosService } from 'src/app/Service/articulos.service';
import { TicketService } from 'src/app/Service/ticket.service';
import * as moment from 'moment';

interface Articulo {
  id: number;
  nombre: string;
  cantidad: number;
  precioventa: number;
  imagen: string;
}

@Component({
  selector: 'app-ventas-screen',
  templateUrl: './ventas-screen.component.html',
  styleUrls: ['./ventas-screen.component.css']
})
export class VentasScreenComponent implements OnInit {

  articulos = [];

  startDate: Date;
  endDate: Date;
  fechaHastaMin: Date;
  fechaInicioMax: Date;

  totalArticulosVendidos: number = 0;
  articulosVendidos = [];

  //Para usar en la busqueda con el pipe
  filtrarArticulos = [];

  constructor(private serviceArticulos: ArticulosService, private serviceTicket: TicketService) { }

  ngOnInit(): void {
    this.traerListadoArticulos();
  }

  traerListadoArticulos() {
    this.serviceArticulos.lista().subscribe(data => {
      this.articulos = data;
    })
  }


  //Me trae todos los objetos vendidos de todos los tickets
  // contarArticulosVendidos() {
  //   this.totalArticulosVendidos = 0;
  //   this.articulosVendidos = []; // Objeto para almacenar los artículos vendidos

  //   this.serviceTicket.lista().subscribe(tickets => {
  //     tickets.forEach(ticket => {
  //       if (ticket.listadoArticulos) { // Verifica si listadoArticulos existe
  //         let articulos = JSON.parse(ticket.listadoArticulos); // Convierte el string a un array
  //         articulos.forEach((articulo: Articulo) => {
  //           this.totalArticulosVendidos += articulo.cantidad;

  //           // Si el artículo ya existe en el objeto, suma la cantidad. Si no, lo agrega.
  //           if (this.articulosVendidos[articulo.nombre]) {
  //             this.articulosVendidos[articulo.nombre] += articulo.cantidad;
  //           } else {
  //             this.articulosVendidos[articulo.nombre] = articulo.cantidad;
  //           }
  //         });
  //       }
  //     });
  //   });
  // }

  contarArticulosVendidos() {
    this.totalArticulosVendidos = 0;
    this.articulosVendidos = [];

    this.serviceTicket.lista().subscribe(tickets => {
      tickets.forEach(ticket => {
        const ticketDate = this.parseDate(ticket.fecha);
        // Verifica si listadoArticulos existe y si la fecha del ticket está dentro del rango
        if (ticket.listadoArticulos && this.isWithinDateRange(ticketDate)) {
          // Convierte el string a un array
          let articulos = JSON.parse(ticket.listadoArticulos);
          articulos.forEach((articulo: Articulo) => {
            this.totalArticulosVendidos += articulo.cantidad;

            // Si el artículo ya existe en el objeto, suma la cantidad. Si no, lo agrega.
            if (this.articulosVendidos[articulo.nombre]) {
              this.articulosVendidos[articulo.nombre] += articulo.cantidad;
            } else {
              this.articulosVendidos[articulo.nombre] = articulo.cantidad;
            }
          });
        }
      });
    });
  }

  // Función para convertir una fecha en formato 'DD/MM/YYYY HH:mm:ss' a un objeto Date
  parseDate(dateString: any) {
    return moment(dateString, 'DD/MM/YYYY HH:mm:ss').startOf('day').toDate();
  }

  // Función para verificar si una fecha está dentro del rango de fechas seleccionado
  isWithinDateRange(date: any) {
    const startDate = moment(this.startDate).startOf('day');
    const endDate = moment(this.endDate).endOf('day');
    date = moment(date);
    return date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate);
  }

  updateFechaHastaMin() {
    this.fechaHastaMin = this.startDate;
  }

  updateFechaInicioMax() {
    this.fechaInicioMax = this.endDate;
  }


}
