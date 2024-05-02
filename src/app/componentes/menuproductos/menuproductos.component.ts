import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  productos: Articulos = null;

  constructor(private sProductos: ArticulosService, private tokenService: TokenService, private activatedRouter: ActivatedRoute) { }

  filtrarArticulos = [];

  isLogged = false;

  ngOnInit(): void {
    this.traerProductos();
    const id = this.activatedRouter.snapshot.params['id'];
    if (id != null) {
      this.sProductos.details(id).subscribe(
        data => {
          this.productos = data
        });
    }
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  traerProductos(): void {
    this.sProductos.lista().subscribe(data => { this.producto = data; })
  }

  delete(id?: number) {
    if (id != undefined) {
      this.sProductos.delete(id).subscribe(
        data => {
          alert("✅ Articulo borrado correctamente");
          this.traerProductos();
        }, err => {
          alert("No se pudo borrar el articulo");
        }
      )
    }
  }


  confirmarPrecio(id, producto) {
    this.sProductos.update(id, producto).subscribe(
      data => {
        alert("✅ Articulo modificado correctamente");
      });
  }

  convertirABooleano(valor: string): boolean {
    return valor.toLowerCase() === 'true';
  }


}
