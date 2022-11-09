import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/Model/ticket';
import { TicketService } from 'src/app/Service/ticket.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  
  ticket: Ticket[] = [];

  VerTicketsGenerados = "none";

  MostrarTickets(){
    this.VerTicketsGenerados = "block";
  }

 
  constructor(private sTicket: TicketService, private router: Router, private activatedRouter: ActivatedRoute, private tokenService: TokenService) { }

  isLogged = false;

  verTickets = "none";

  verTicketsTablas(){
    this.verTickets = "block";
    
  }

  ngOnInit(): void {
    this.traerTickets();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  traerTickets(): void{
    this.sTicket.lista().subscribe(data => {this.ticket = data;})
  }
  
  cancelar(): void {
    this.router.navigate(['caja']);
  }

  delete(id?: number){
    if(id != undefined){
      this.sTicket.delete(id).subscribe(
        data =>{alert("✅ Ticket borrado correctamente");
          this.traerTickets();
        }, err =>{
          alert("No se pudo borrar el articulo");
        }
      )
    }
  }

}
