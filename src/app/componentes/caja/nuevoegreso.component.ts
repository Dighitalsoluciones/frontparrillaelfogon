import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Egresos } from 'src/app/Model/egresos';
import { EgresosService } from 'src/app/Service/egresos.service';

@Component({
  selector: 'app-nuevoegreso',
  templateUrl: './nuevoegreso.component.html',
  styleUrls: ['./nuevoegreso.component.css']
})
export class NuevoegresoComponent implements OnInit {
  listado: string[]=["RETIRO", "GASTO" , "PAGO A PROVEEDOR", "AJUSTE"]; 

  fecha: string = formatDate(Date.now(), 'dd/MM/yyyy hh:mm:ss', 'en-US');
  importe: number = 0;
  tipodegasto: string = '';
  realizadopor: string = '';
  observacion: string = '';
  mostrar: string = "true";

  constructor(private sEgresos: EgresosService, private router: Router) { }

  ngOnInit(): void {
  }
  onCreate(): void{
    const egresos = new Egresos(this.fecha, this.importe, this.tipodegasto, this.realizadopor, this.observacion, this.mostrar);
    this.sEgresos.save(egresos).subscribe(
      data=>{alert("✅ Egresos realizado correctamente");
      history.go(-1);
    }, err =>{
      alert("⛔Fallo en la creación del egreso, debes completar todos los campos⛔");
      history.go(-1)
    }
    )
  }

  cancelar(): void {
    this.router.navigate(['caja']);
  }

}
