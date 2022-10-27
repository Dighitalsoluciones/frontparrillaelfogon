import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulos } from 'src/app/Model/articulos';
import { Mesas1 } from 'src/app/Model/mesas1';
import { ArticulosService } from 'src/app/Service/articulos.service';
import { Mesas1Service } from 'src/app/Service/mesas1.service';


@Component({
  selector: 'app-comandasmesas',
  templateUrl: './comandasmesas.component.html',
  styleUrls: ['./comandasmesas.component.css']
})
export class ComandasmesasComponent implements OnInit {
  Mesas : Mesas1 = null;
  total: number = 0;
  producto: Articulos[] = [];

  

  displayStyle = "none";

  botonAgregarArticulos = "none"
  
  verAbrirMesas = "none";

  verComanda = "none";
  
  cerrar = false;

  condicionIf = false;

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  mostrarComanda(){
    this.verComanda = "block";
  }
 
  cambioCierre(){
  this.cerrar = true;
  } 
 
  verBotonAgregar(){
  this.botonAgregarArticulos = "block";
  this.displayStyle = "none";
  }

  DesapareceBoton = 0;
  
  comandafinal = [];
 
  unicos = [];
  
  sinceros = [];
  
  descomprimir = [];

  traelo = [];
  
  estavezsi = [];

  constructor(private sMesas: Mesas1Service, private sProductos: ArticulosService, private activatedRouter: ActivatedRoute, 
    private router: Router) {
    }


    ngOnInit(): void {
    
      
        this.producto.forEach(Articulos => {
        this.total += Articulos.cantidad * Articulos.precioventa
      })
      
      this.traelo = [];
      this.descomprimir = [];

      this.DesapareceBoton = null;  
      
      this.traerProductos();
      
      this.comandafinal = [];

      this.estavezsi = [];

      const id = this.activatedRouter.snapshot.params['id'];
      this.sMesas.details(id).subscribe(
        data =>{
          this.Mesas = data;
        }, err =>{
          alert("Error al modificar la mesa");
          this.router.navigate(['']);
        }
      )
      
    }
     
    verBoton(): any{
      if(this.Mesas.cierre === "true"){
        return false;

      }else{
        return true;
      }
    }

    NoVerBoton(): any{
      if(this.Mesas.cierre === "true"){
        return true;

      }else{
        return false;
      }
    }

    verBotonAgrega(): any{
      if(this.Mesas.cierre === "true"){
        return true;

      }else{
        return false;
      }
    }

    CantidadCero(Articulos: any){
      if(Articulos.cantidad === 0){
        return false;

      }else{
        return true;
      }
    }

    
      traerProductos(): void{
      this.sProductos.lista().subscribe(data => {this.producto = data;})
      }


      AddItem(Articulos: any){
        if (Articulos.cantidad == undefined){
          Articulos.cantidad = 1;
        } else if (Articulos.cantidad != undefined){
          ++Articulos.cantidad;
          this.comandafinal.push(Articulos);
          this.unicos = Array.from(new Set(this.comandafinal));
          this.sinceros = this.unicos.filter(Articulos => Articulos.cantidad !=0);
        }
      }

      DelItem(Articulos: any){
        if (Articulos.cantidad == undefined){
          Articulos.cantidad = 1;
        } else if (Articulos.cantidad != undefined){
          --Articulos.cantidad;
          this.comandafinal.filter((Articulos) => Articulos !== Articulos);
          this.sinceros = this.unicos.filter(Articulos => Articulos.cantidad !=0);
          
        }
      }


      AgregarSinRepetir(producto){

        let repetido = false;
        for(let i=0; i< this.sinceros.length; i++)
        {
          if(this.sinceros[i].id==producto.id)
          {
            this.sinceros[i].cantidad++
            repetido=true;
          }
        }
        if(repetido == false)
        {
          this.sinceros.push(producto);
          
          
        }
      }

      SacarSinRepetir(producto){

        let repetido = false;
        for(let i=0; i< this.sinceros.length; i++)
        {
          if(this.sinceros[i].id==producto.id)
          {
            this.sinceros[i].cantidad--
            repetido=true;
          }
        }
        if(repetido == false)
        {
          this.sinceros.push(producto);
          
        }
      }

      VerAlgoAnterior(){
        let recoveredData = localStorage.getItem('comanda')
if(recoveredData == null){
    //No tenemos nada guardado, por lo cual vamos a guardar el carListFav
  localStorage.setItem('comanda', JSON.stringify(this.sinceros))
} else {
    //Tenemos algo, por lo cual vamos a añadir un nuevo coche
  let data = JSON.parse(recoveredData)
  let newCar = {name:'car3', id:3}
  //Asegurate que lo que guardes es realmente un array.
  data.push(newCar)
  localStorage.setItem('comanda', JSON.stringify(data))
}

//Check si se guardo bien
console.log(localStorage.getItem('car'))
      }


      
      

      returnZero() {
        return 0
      }

    guardarCambios(){
      
      this.Mesas.comanda = JSON.stringify(this.sinceros, ['id','nombre','cantidad','precioventa','imagen'] );
      console.log(this.Mesas.comanda);
    }  

    DevolverLista(){
     this.traelo = JSON.parse(this.Mesas.comanda);
     console.log(this.traelo);
     
    }

    TraeloDale(): any{
     return Array.from(new Set(this.traelo));
    }
 

    
  
    onUpdate(): void{
      const id = this.activatedRouter.snapshot.params['id'];
      this.sMesas.update(id, this.Mesas).subscribe(
        data => {alert("✅ Mesa modificada correctamente");
          this.router.navigate(['']);
        }, err =>{
          alert("⛔ Error al modificar la mesa ⛔");
          this.router.navigate(['']);
        }
      )
      
    }
    
  
    cancelar(): void {
      this.router.navigate(['']);
    }
    
    estado: string = ""; 
    
    
    abrirMesa(){
      this.Mesas.estado="Abierta";
      this.Mesas.cierre = "true";
      
    } 

    cerrarMesa(){
      this.Mesas.estado="Cerrada";
      this.Mesas.cierre = "false";
      this.Mesas.comanda = "vacio";
    } 
    
    
}
