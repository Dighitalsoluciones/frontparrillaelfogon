import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/Model/ticket';
import { TicketService } from 'src/app/Service/ticket.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  
  ticket: Ticket = null;

  listadoArticulos: string = '';
  importe: number = 0;
  observacion: string = '';
  fecha: number = 0;
  

  constructor(private sTicket: TicketService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sTicket.details(id).subscribe(
      data =>{
        this.ticket = data;
      }, err =>{
        alert("Error al modificar el ticket");
        this.router.navigate(['caja']);
      }
    )
  }

  onCreate(): void{
    const ticket = new Ticket(this.listadoArticulos, this.importe, this.observacion, this.fecha);
    this.sTicket.save(ticket).subscribe(
      data=>{alert("✅ Ticket creado correctamente");
      this.router.navigate(['menuarticulos']);
    }, err =>{
      alert("⛔Fallo en la creación del ticket⛔");
      this.router.navigate(['menuarticulos'])
    }
    )
  }

  cancelar(): void {
    this.router.navigate(['caja']);
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.sTicket.update(id, this.ticket).subscribe(
      data => {alert("✅ Ticket modificado correctamente");
        this.router.navigate(['caja']);
      }, err =>{
        alert("⛔ Error al modificar el ticket ⛔");
        this.router.navigate(['caja']);
      }
    )
    
  }

  
  caja = [{id:1, nombre:'perro', cantidad: 6}, {id:2, nombre:'gato', cantidad: 10}];

}
