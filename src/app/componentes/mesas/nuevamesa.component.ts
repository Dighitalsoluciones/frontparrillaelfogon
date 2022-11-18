import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesas1 } from 'src/app/Model/mesas1';
import { Mesas1Service } from 'src/app/Service/mesas1.service';

@Component({
  selector: 'app-nuevamesa',
  templateUrl: './nuevamesa.component.html',
  styleUrls: ['./nuevamesa.component.css']
})
export class NuevamesaComponent implements OnInit {
  listaMesas: string[]=["https://res.cloudinary.com/dighitalsoluciones/image/upload/v1666925103/APP%20PARRILLA%20EL%20FOGON/mesalibrevertical_yipjpm.png", "https://res.cloudinary.com/dighitalsoluciones/image/upload/v1664023857/APP%20PARRILLA%20EL%20FOGON/mesas_jf2twc.png"];

    estado: string = "Cerrada";
    comanda: string = "vacio";
    cierre: string = "false";
    liquidada: string = "false";
    imagen: string = "https://res.cloudinary.com/dighitalsoluciones/image/upload/v1666925103/APP%20PARRILLA%20EL%20FOGON/mesalibrevertical_yipjpm.png";
    numeroMesa: string = '';
    totalComanda = 0;

  constructor(private sMesas1: Mesas1Service, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void{
    const mesas = new Mesas1(this.estado, this.comanda, this.cierre, this.liquidada, this.imagen, this.numeroMesa, this.totalComanda);
    this.sMesas1.save(mesas).subscribe(
      data=>{alert("✅ Mesa creada correctamente");
      this.router.navigate(['menumesas']);
    }, err =>{
      alert("⛔Fallo en la creación de la mesa, debes completar todos los campos⛔");
      this.router.navigate(['menumesas'])
    }
    )
  }

  cancelar(): void {
    this.router.navigate(['menumesas']);
  }


}
