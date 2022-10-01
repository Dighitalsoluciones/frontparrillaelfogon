import { Component, OnInit } from '@angular/core';
import { Articulos } from 'src/app/Model/articulos';
import { ArticulosService } from 'src/app/Service/articulos.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-menuproductos',
  templateUrl: './menuproductos.component.html',
  styleUrls: ['./menuproductos.component.css']
})
export class MenuproductosComponent implements OnInit {
  producto: Articulos[] = [];
  constructor(private sProductos: ArticulosService, private tokenService: TokenService ) { }
  
  filtrarArticulos = [];

  isLogged = false;

  ngOnInit(): void {
    this.traerProductos();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  traerProductos(): void{
    this.sProductos.lista().subscribe(data => {this.producto = data;})
  }

  delete(id?: number){
    if(id != undefined){
      this.sProductos.delete(id).subscribe(
        data =>{alert("✅ Articulo borrado correctamente");
          this.traerProductos();
        }, err =>{
          alert("No se pudo borrar el articulo");
        }
      )
    }
  }

}
