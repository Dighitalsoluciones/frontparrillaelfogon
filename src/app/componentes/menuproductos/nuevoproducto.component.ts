import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Articulos } from 'src/app/Model/articulos';
import { ArticulosService } from 'src/app/Service/articulos.service';
import { SpinnerService } from 'src/app/Service/spinner.service';

@Component({
  selector: 'app-nuevoproducto',
  templateUrl: './nuevoproducto.component.html',
  styleUrls: ['./nuevoproducto.component.css']
})
export class NuevoproductoComponent implements OnInit {
  lista: string[]=["COCINA", "PARRILLA" , "BEBIDAS"]; 

  nombre: string = '';
  familia: string = '';
  stock: number = 0;
  puntorepo: number = 0;
  costo: number = 0;
  precioventa: number = 0;
  stockinicial: number = 0;
  imagen: string = '';
  cantidad: number = 0;
  checkEdit: string = "false";
  isTrazable: boolean = false;

  constructor(private sArticulos: ArticulosService, private router: Router,
     private serviceSpinner: SpinnerService) { }

  ngOnInit(): void {
  }

  onCreate(): void{
    if(this.stockinicial != 0){
      this.stock = this.stockinicial;
      this.serviceSpinner.llamarSpinner();
    }
    
    const producto = new Articulos(this.nombre, this.familia, this.stock, this.puntorepo, this.costo,
       this.precioventa, this.stockinicial, this.imagen, this.cantidad, this.checkEdit, this.isTrazable);
    this.sArticulos.save(producto).subscribe(
      data=>{alert("✅ Articulo creado correctamente");
      this.serviceSpinner.pararSpinner();
      this.router.navigate(['menuarticulos']);
    }, err =>{
      alert("⛔Fallo en la creación del articulo, debes completar todos los campos⛔");
      this.serviceSpinner.pararSpinner();
      this.router.navigate(['menuarticulos'])
    }
    )
  }

  cancelar(): void {
    this.router.navigate(['menuarticulos']);
  }

}
