import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recibos } from 'src/app/Model/recibos';
import { RecibosService } from 'src/app/Service/recibos.service';

@Component({
  selector: 'app-cajadiariaeditar',
  templateUrl: './cajadiariaeditar.component.html',
  styleUrls: ['./cajadiariaeditar.component.css']
})
export class CajadiariaeditarComponent implements OnInit {
  recibos: Recibos = null;
  formadepago: string[]=["EFECTIV", "MP"];
  constructor(private sRecibos: RecibosService, private activatedRouter: ActivatedRoute, 
    private router: Router) { }

    ngOnInit(): void {
      const id = this.activatedRouter.snapshot.params['id'];
      this.sRecibos.details(id).subscribe(
        data =>{
          this.recibos = data;
        }, err =>{
          alert("Error al modificar la forma de pago");
          this.router.navigate(['cajadiaria']);
        }
      )
    }
  
    onUpdate(): void{
      const id = this.activatedRouter.snapshot.params['id'];
      this.sRecibos.update(id, this.recibos).subscribe(
        data => {alert("✅ Modificada forma de pago");
          this.router.navigate(['cajadiaria']);
        }, err =>{
          alert("⛔ Error al modificar el recibo ⛔");
          this.router.navigate(['cajadiaria']);
        }
      )
      
    }
  
    cancelar(): void {
      this.router.navigate(['cajadiaria']);
    }

}
