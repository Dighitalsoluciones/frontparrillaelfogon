import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mesas1 } from 'src/app/Model/mesas1';
import { Ticket } from 'src/app/Model/ticket';
import { TicketService } from 'src/app/Service/ticket.service';

@Component({
  selector: 'app-comandacocina',
  templateUrl: './comandacocina.component.html',
  styleUrls: ['./comandacocina.component.css']
})
export class ComandacocinaComponent implements OnInit {
  ticket : Ticket = null;

  Mesas: Mesas1[] = [];

  traelo = [];

  verTablaArt = "none";

  verTablaArticulos(){
    this.verTablaArt = "block";
    console.log(this.verTablaArt)
  }

  constructor(private sTicket: TicketService, private activatedRouter: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sTicket.details(id).subscribe(
      data =>{
        this.ticket = data;
      }, err =>{
        alert("Error al modificar el ticket");
        this.router.navigate(['']);
      }
    )
    
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.sTicket.update(id, this.ticket).subscribe(
      data => {alert("✅ Ticket modificado correctamente");
        this.router.navigate(['']);
      }, err =>{
        alert("⛔ Error al modificar el ticket⛔");
        this.router.navigate(['']);
      }
    )
    
  }

  cancelar(): void {
    this.router.navigate(['']);
  }

  DevolverListado(){
    this.traelo = JSON.parse(this.ticket.listadoArticulos);
    console.log(this.traelo);
    
   }

   ImprimirTicket(){
    window.print();
  }
}

