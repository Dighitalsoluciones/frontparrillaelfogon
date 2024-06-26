import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/Model/ticket';
import { TicketService } from 'src/app/Service/ticket.service';

@Component({
  selector: 'app-vistaimpresion',
  templateUrl: './vistaimpresion.component.html',
  styleUrls: ['./vistaimpresion.component.css']
})
export class VistaimpresionComponent implements OnInit {
  ticket: Ticket = null;

  traelo = [];

  verTablaArt = "none";

  verTablaArticulos() {
    this.verTablaArt = "block";
    console.log(this.verTablaArt)
  }

  constructor(private sTicket: TicketService, private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sTicket.details(id).subscribe(
      data => {
        this.ticket = data;
      }, err => {
        alert("Error al modificar el ticket");
        this.router.navigate(['menuarticulos']);
      }
    )
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sTicket.update(id, this.ticket).subscribe(
      data => {
        alert("✅ Ticket modificado correctamente");
        this.router.navigate(['caja']);
      }, err => {
        alert("⛔ Error al modificar el ticket⛔");
        this.router.navigate(['caja']);
      }
    )

  }

  cancelar(): void {
    this.router.navigate(['caja']);
  }

  DevolverListado() {
    try {
      this.traelo = JSON.parse(this.ticket.listadoArticulos);
      console.log(this.traelo);
    } catch (error) {
      console.error('Error al analizar JSON:', error);
    }
  }

  ImprimirTicket() {
    window.print();
  }
}
