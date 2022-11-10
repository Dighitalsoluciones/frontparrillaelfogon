import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recibos } from 'src/app/Model/recibos';
import { Ticket } from 'src/app/Model/ticket';
import { RecibosService } from 'src/app/Service/recibos.service';
import { TicketService } from 'src/app/Service/ticket.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  
  ticket: Ticket[] = [];
  recibos: Recibos[]= [];

  VerTicketsGenerados = "none";

  MostrarTickets(){
    this.VerTicketsGenerados = "block";
  }

 
  constructor(private sTicket: TicketService, private sRecibos: RecibosService ,private router: Router, private activatedRouter: ActivatedRoute, private tokenService: TokenService) { }

  isLogged = false;

  verTickets = "none";

  verTicketsTablas(){
    this.verTickets = "block";
    
  }

  ngOnInit(): void {
    this.SumaTotalRecibos();
    this.traerTickets();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.traerRecibos();
  }

  traerTickets(): void{
    this.sTicket.lista().subscribe(data => {this.ticket = data;})
  }
  
  traerRecibos(): void{
    this.sRecibos.lista().subscribe(data => {this.recibos = data;})
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

  deleteRec(id?: number){
    if(id != undefined){
      this.sRecibos.delete(id).subscribe(
        data =>{alert("✅ Recibo borrado correctamente");
          this.traerRecibos();
        }, err =>{
          alert("No se pudo borrar el recibo");
        }
      )
    }
  }

  totalCaja: number = 0;

  TotalEnCaja(){
    this.totalCaja = 0;
    this.recibos.forEach(Recibos => {
    this.totalCaja += Recibos.importe;
    
    
  });
  return this.totalCaja;
}



SumaTotalRecibos(){
 const sumartotal = this.recibos.map(item => item.importe).reduce((prev, curr) => prev + curr, 0);
 return sumartotal;
}


}
