import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulos } from 'src/app/Model/articulos';
import { ArticulosService } from 'src/app/Service/articulos.service';

@Component({
  selector: 'app-editarproducto',
  templateUrl: './editarproducto.component.html',
  styleUrls: ['./editarproducto.component.css']
})
export class EditarproductoComponent implements OnInit {
  producto : Articulos = null;

  constructor(private sArticulos: ArticulosService, private activatedRouter: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sArticulos.details(id).subscribe(
      data =>{
        this.producto = data;
      }, err =>{
        alert("Error al modificar la experiencia");
        this.router.navigate(['menuarticulos']);
      }
    )
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.sArticulos.update(id, this.producto).subscribe(
      data => {alert("✅ Articulo modificado correctamente");
        this.router.navigate(['menuarticulos']);
      }, err =>{
        alert("⛔ Error al modificar el articulo ⛔");
        this.router.navigate(['menuarticulos']);
      }
    )
    
  }

  cancelar(): void {
    this.router.navigate(['menuarticulos']);
  }

}
