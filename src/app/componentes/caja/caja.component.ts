import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Egresos } from 'src/app/Model/egresos';
import { Recibos } from 'src/app/Model/recibos';
import { Ticket } from 'src/app/Model/ticket';
import { EgresosService } from 'src/app/Service/egresos.service';
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
  egresos: Egresos[]= [];

  totalR: number = 0;
  totalE: number = 0;
  totalG: number = 0;
  VerTicketsGenerados = "none";
  recibosDeHoy = [];

  MostrarTickets(){
    this.VerTicketsGenerados = "block";
  }

 
  constructor(private sTicket: TicketService, private sEgresos: EgresosService ,private sRecibos: RecibosService ,private router: Router, private activatedRouter: ActivatedRoute, private tokenService: TokenService) { }

  isLogged = false;

  verTickets = "none";

  verTicketsTablas(){
    this.verTickets = "block";
    
  }

  ngOnInit(): void {
    this.TotalDeRec();
    this.TotalDeEgresos();
    this.TotalDeCaja();
    this.traerTickets();
    this.traerEgresos();
    this.FiltrarHoy();
    
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
  traerEgresos(): void{
    this.sEgresos.lista().subscribe(data => {this.egresos = data;})
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
  deleteEgreso(id?: number){
    if(id != undefined){
      this.sEgresos.delete(id).subscribe(
        data =>{alert("✅ Egreso borrado correctamente");
          this.traerEgresos();
        }, err =>{
          alert("No se pudo borrar el Egreso");
        }
      )
    }
  }

  totalCaja: number = 0;

  TotalEnCaja(){
    this.totalCaja = 0;
    this.recibos.forEach(Recibos => {
    this.totalCaja += Recibos.importe;
    console.log(Recibos.importe);
    
  });
  return this.totalCaja;
}

TotalDeRec(){
  this.totalR = 0;
  this.recibos.forEach(recibos => {
  this.totalR += recibos.importe;
});

return this.totalR;
}
TotalDeEgresos(){
  this.totalE = 0;
  this.egresos.forEach(egresos => {
  this.totalE += egresos.importe;
});

return this.totalE;
}


TotalDeCaja(){
  this.totalG = 0;
  this.recibos.forEach(recibos => {
  this.totalG += recibos.importe;
});
this.egresos.forEach(egresos =>{
  this.totalG -= egresos.importe;
})
return this.totalG;
}

FiltrarHoy(){
  this.recibosDeHoy = this.egresos.filter(egresos => egresos.mostrar === "true");
  return this.recibosDeHoy;
}

/* SumarTotal : number = 0;

SumaTotalRecibos(){
 this.SumarTotal = this.recibos.map(recibos => recibos.importe).reduce((prev, curr) => prev + curr, 0);
 console.log(this.SumarTotal);} */



}
