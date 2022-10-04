import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Articulos } from 'src/app/Model/articulos';
import { ArticulosService } from 'src/app/Service/articulos.service';

@Component({
  selector: 'app-nuevoproducto',
  templateUrl: './nuevoproducto.component.html',
  styleUrls: ['./nuevoproducto.component.css']
})
export class NuevoproductoComponent implements OnInit {
  lista: string[]=["COMIDAS", "BEBIDAS" , "POSTRES"];

  nombre: string = '';
  familia: string = '';
  stock: string = '';
  puntorepo: string = '';
  costo: string = '';
  precioventa: string = '';
  stockinicial: string = '';
  imagen: string = '';

  constructor(private sArticulos: ArticulosService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void{
    const producto = new Articulos(this.nombre, this.familia, this.stock, this.puntorepo, this.costo, this.precioventa, this.stockinicial, this.imagen);
    this.sArticulos.save(producto).subscribe(
      data=>{alert("✅ Articulo creado correctamente");
      this.router.navigate(['menuarticulos']);
    }, err =>{
      alert("⛔Fallo en la creación del articulo, debes completar todos los campos⛔");
      this.router.navigate(['menuarticulos'])
    }
    )
  }

  cancelar(): void {
    this.router.navigate(['menuarticulos']);
  }

}
