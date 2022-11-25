import { Component, OnInit } from '@angular/core';
import { Mesas1 } from 'src/app/Model/mesas1';
import { Mesas1Service } from 'src/app/Service/mesas1.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-mesas2',
  templateUrl: './mesas2.component.html',
  styleUrls: ['./mesas2.component.css']
})
export class Mesas2Component implements OnInit {
  mesas1: Mesas1[] = [];

  InicioPosicion: string;
  PosicionesGuardadas = [];
  
  isLogged = false;

  constructor(private sMesas1: Mesas1Service, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.InicioPosicion = "";
    this.traerMesas1();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  traerMesas1(): void{
    this.sMesas1.lista().subscribe(data => {this.mesas1 = data;})
  }

  delete(id?: number){
    if(id != undefined){
      this.sMesas1.delete(id).subscribe(
        data =>{alert("✅ Mesa borrada correctamente");
          this.traerMesas1();
        }, err =>{
          alert("No se pudo borrar el articulo");
        }
      )
    }
  }

  


}
