import { Component, OnInit } from '@angular/core';
import { Articulos } from 'src/app/Model/articulos';
import { ArticulosService } from 'src/app/Service/articulos.service';
import { TicketService } from 'src/app/Service/ticket.service';
import { format } from '@formkit/tempo';

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
  totalArticulosVendidos: number = 0;
  articulosVendidos = [];

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
    this.articulosVendidos = []; // Objeto para almacenar los artículos vendidos
  
    this.serviceTicket.lista().subscribe(tickets => {
      tickets.forEach(ticket => {
        const ticketDate = this.parseDate(ticket.fecha);
        if (ticket.listadoArticulos && this.isWithinDateRange(ticketDate)) { // Verifica si listadoArticulos existe y si la fecha del ticket está dentro del rango
          let articulos = JSON.parse(ticket.listadoArticulos); // Convierte el string a un array
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
parseDate(dateString) {
  const [day, month, yearAndTime] = dateString.split('/');
  const [year, time] = yearAndTime.split(' ');
  let date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0); // Asegura que la fecha comienza a las 00:00:00
  return date;
}
  
  // Función para verificar si una fecha está dentro del rango de fechas seleccionado
  isWithinDateRange(date) {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    startDate.setHours(0, 0, 0, 0); // Asegura que la fecha de inicio comienza a las 00:00:00
    endDate.setHours(23, 59, 59, 999); // Asegura que la fecha de fin termina a las 23:59:59
    // Ignora la hora al comparar las fechas
    return date.setHours(0, 0, 0, 0) >= startDate.getTime() && date.setHours(0, 0, 0, 0) <= endDate.getTime();
  }

}
