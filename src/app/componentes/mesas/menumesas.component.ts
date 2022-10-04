import { Component, OnInit } from '@angular/core';
import { Mesas1 } from 'src/app/Model/mesas1';
import { Mesas1Service } from 'src/app/Service/mesas1.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-menumesas',
  templateUrl: './menumesas.component.html',
  styleUrls: ['./menumesas.component.css']
})
export class MenumesasComponent implements OnInit {
mesas: Mesas1 [] = [];

  constructor(private sMesas1: Mesas1Service, private tokenService: TokenService) { }

  filtrarMesas = [];

  isLogged = false;

  ngOnInit(): void {
    this.traerMesas();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  traerMesas(): void{
    this.sMesas1.lista().subscribe(data => {this.mesas = data;})
  }

  delete(id?: number){
    if(id != undefined){
      this.sMesas1.delete(id).subscribe(
        data =>{alert("✅ Mesa borrada correctamente");
          this.traerMesas();
        }, err =>{
          alert("No se pudo borrar la mesa");
        }
      )
    }
  }
}


