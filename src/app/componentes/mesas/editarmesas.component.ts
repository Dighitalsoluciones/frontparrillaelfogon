import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mesas1 } from 'src/app/Model/mesas1';
import { Mesas1Service } from 'src/app/Service/mesas1.service';

@Component({
  selector: 'app-editarmesas',
  templateUrl: './editarmesas.component.html',
  styleUrls: ['./editarmesas.component.css']
})
export class EditarmesasComponent implements OnInit {
  Mesas : Mesas1 = null;
  listaMesas: string[]=["https://res.cloudinary.com/dighitalsoluciones/image/upload/v1664025153/APP%20PARRILLA%20EL%20FOGON/mesa_vertical_cguwnn.png", "https://res.cloudinary.com/dighitalsoluciones/image/upload/v1664023857/APP%20PARRILLA%20EL%20FOGON/mesas_jf2twc.png"];

  constructor(private sMesas: Mesas1Service, private activatedRouter: ActivatedRoute, 
    private router: Router) { }

    ngOnInit(): void {
      const id = this.activatedRouter.snapshot.params['id'];
      this.sMesas.details(id).subscribe(
        data =>{
          this.Mesas = data;
        }, err =>{
          alert("Error al modificar la mesas");
          this.router.navigate(['menumesas']);
        }
      )
    }
  
    onUpdate(): void{
      const id = this.activatedRouter.snapshot.params['id'];
      this.sMesas.update(id, this.Mesas).subscribe(
        data => {alert("✅ Mesa modificada correctamente");
          this.router.navigate(['menumesas']);
        }, err =>{
          alert("⛔ Error al modificar la mesa ⛔");
          this.router.navigate(['menumesas']);
        }
      )
      
    }
  
    cancelar(): void {
      this.router.navigate(['menumesas']);
    }

}
