import { Component, OnInit } from '@angular/core';
import { Mesas1 } from 'src/app/Model/mesas1';
import { Mesas1Service } from 'src/app/Service/mesas1.service';
import { TokenService } from 'src/app/Service/token.service';
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem,} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {
  mesas1: Mesas1[] = [];

  loading = true;
  cargado = false;
  InicioPosicion: string;
  PosicionesGuardadas = [];
  
  isLogged = false;
  bloquearArrastre = true;

  constructor(private sMesas1: Mesas1Service, private tokenService: TokenService) { }

  
  

  ngOnInit(): void {
    /*agregado del spinner funcion de setTimeout 131 a 134*/ 
    setTimeout(() => {
      this.loading = false;
      this.cargado = true;
    }, 1200);

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

  dropOnList(event: CdkDragDrop<Mesas1[]>){
    const element = (event.previousContainer.data as Array<Mesas1>)[event.previousIndex];
    moveItemInArray(
      
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )

  }
 
  GuardarPosiciones(){
    localStorage.setItem('mesas', JSON.stringify(this.mesas1));
    console.log(this.mesas1);
    
  }


  TraerPosiciones(){
    this.InicioPosicion = localStorage.getItem('mesas');
    this.PosicionesGuardadas = JSON.parse(this.InicioPosicion);
    console.log(this.InicioPosicion);
    

  }

}
