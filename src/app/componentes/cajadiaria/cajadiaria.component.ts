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
  selector: 'app-cajadiaria',
  templateUrl: './cajadiaria.component.html',
  styleUrls: ['./cajadiaria.component.css']
})
export class CajadiariaComponent implements OnInit {
  ticket: Ticket[] = [];
  recibos: Recibos[]= [];
  egresos: Egresos[]= [];

  totalR: number = 0;
  totalE: number = 0;
  totalG: number = 0;
  totalT: number = 0;
  totalRMP: number = 0;
  totalREFE: number = 0;

  VerTicketsGenerados = "none";
  recibosDeHoy = [];
  egresosDeHoy = [];
  ticketsDeHoy = [];
  recibosDeHoyMP = [];
  recibosDeHoyEFE = [];

  VistaCierreZ = "none";
  VistaNormal = "block";
  autorizacion: string = "";

  MostrarTickets(){
    this.VerTicketsGenerados = "block";
  }

  ResumenZ(){
    this.VistaCierreZ = "block";
    this.VistaNormal = "none";
  }
 
  constructor(private sTicket: TicketService, private sEgresos: EgresosService ,private sRecibos: RecibosService ,private router: Router, private activatedRouter: ActivatedRoute, private tokenService: TokenService) { }

  isLogged = false;

  verTickets = "none";

  verTicketsTablas(){
    this.verTickets = "block";
    
  }

  ngOnInit(): void {
    this.FiltrarHoyEgresos();
    this.TotalDeRec();
    this.TotalDeRecMP;
    this.TotalDeRecEFE;
    this.TotalDeEgresos();
    this.TotalDeCaja();
    this.traerTickets();
    this.traerEgresos();
    this.TotalFacturado();
    
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.traerRecibos();
  }

  fecha: string = formatDate(Date.now(), 'dd/MM/yyyy hh:mm:ss', 'en-US');
  
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
    this.router.navigate(['cajadiaria']);
  }

  delete(id?: number){
    if(id != undefined){
      if(this.autorizacion == "autorizado"){
      this.sTicket.delete(id).subscribe(
        data =>{alert("✅ Ticket borrado correctamente");
          this.autorizacion = "";
          location.reload();
        }, err =>{
          alert("No se pudo borrar el articulo");
        }
      )
    }else{
      alert("⛔ Contraseña incorrecta");
      this.autorizacion = "";
    }
   }
  }

  deleteRec(id?: number){
    if(id != undefined){
      if(this.autorizacion == "autorizado"){
      this.sRecibos.delete(id).subscribe(
        data =>{alert("✅ Recibo borrado correctamente");
          this.autorizacion = "";
          location.reload();
        }, err =>{
          alert("No se pudo borrar el recibo");
        }
      )
    }else{
      alert("⛔ Contraseña incorrecta");
      this.autorizacion = "";
    }
  }
  }
  deleteEgreso(id?: number){
    if(id != undefined){
      if(this.autorizacion == "autorizado"){
      this.sEgresos.delete(id).subscribe(
        data =>{alert("✅ Egreso borrado correctamente");
          this.autorizacion = "";
          location.reload();
        }, err =>{
          alert("No se pudo borrar el Egreso");
        }
      )
    }else{
      alert("⛔ Contraseña incorrecta");
      this.autorizacion = "";
    }
  }
  }

  FiltrarHoyEgresos(){
    this.egresosDeHoy = this.egresos.filter(egresos => egresos.fecha.substring(0,10) === formatDate(Date.now(), 'dd/MM/yyyy', 'en-US'));
    return this.egresosDeHoy;
  }
  
  FiltrarHoyRecibos(){
    this.recibosDeHoy = this.recibos.filter(recibos => recibos.fecha.substring(0,10) === formatDate(Date.now(), 'dd/MM/yyyy', 'en-US'));
    return this.recibosDeHoy;
  }
  
  FiltrarHoyTickets(){
    this.ticketsDeHoy = this.ticket.filter(tickets => tickets.fecha.substring(0,10) === formatDate(Date.now(), 'dd/MM/yyyy', 'en-US'));
    return this.ticketsDeHoy;
  }

  MostrarDatosHoy(){
    this.FiltrarHoyRecibos();
    this.FiltrarHoyEgresos();
    this.FiltrarHoyTickets();
    this.FiltrarHoyRecibosMP();
    this.FiltrarHoyRecibosEFE();
  }

  totalCaja: number = 0;



TotalDeRec(){
  this.totalR = 0;
  this.recibosDeHoy.forEach(recibos => {
  this.totalR += recibos.importe;
});

return this.totalR;
}
TotalDeEgresos(){
  this.totalE = 0;
  this.egresosDeHoy.forEach(egresos => {
  this.totalE += egresos.importe;
});

return this.totalE;
}

TotalFacturado(){
  this.totalT = 0;
  this.ticketsDeHoy.forEach(ticket => {
  this.totalT += ticket.importe;
});

return this.totalT;
}

TotalDeCaja(){
  this.totalG = 0;
  this.recibosDeHoy.forEach(recibos => {
  this.totalG += recibos.importe;
});
this.egresosDeHoy.forEach(egresos =>{
  this.totalG -= egresos.importe;
})
return this.totalG;
}

ImprimirResumen(){
  window.print();
}

FiltrarHoyRecibosMP(){
  this.recibosDeHoyMP = this.recibosDeHoy.filter(recibos => recibos.formadepago === "MP");
  return this.recibosDeHoyMP;
}

TotalDeRecMP(){
  this.totalRMP = 0;
  this.recibosDeHoyMP.forEach(recibos => {
  this.totalRMP += recibos.importe;
});
  return this.totalRMP;
}

//agregado filtro de recibos solo efectivo
FiltrarHoyRecibosEFE(){
 this.recibosDeHoyEFE = this.recibosDeHoy.filter(recibos => recibos.formadepago === "EFECTIV");
 return this.recibosDeHoyEFE; 
}
TotalDeRecEFE(){
  this.totalREFE = 0;
  this.recibosDeHoyEFE.forEach(recibos => {
    this.totalREFE += recibos.importe;
  });
  return this.totalREFE;

}


}
