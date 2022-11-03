import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulos } from 'src/app/Model/articulos';
import { Mesas1 } from 'src/app/Model/mesas1';
import { Ticket } from 'src/app/Model/ticket';
import { ArticulosService } from 'src/app/Service/articulos.service';
import { Mesas1Service } from 'src/app/Service/mesas1.service';
import { TicketService } from 'src/app/Service/ticket.service';


@Component({
  selector: 'app-comandasmesas',
  templateUrl: './comandasmesas.component.html',
  styleUrls: ['./comandasmesas.component.css']
})
export class ComandasmesasComponent implements OnInit, OnChanges {
  Mesas : Mesas1 = null;
  total: number = 0;
  producto: Articulos[] = [];
  Ticket: Ticket = null;

 
  verabrirdespuesdelcierre = "true";

  displayStyle = "none";

  botonAgregarArticulos = "none"
  
  verAbrirMesas = "none";

  verComanda = "none";

  verGuardar = "none";
  
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

  verBotonGuardar(){
  this.verGuardar = "block";
  }

  nomostrardespuesdelcierre(){
    this.verabrirdespuesdelcierre = "none";
  }

  DesapareceBoton = 0;
  
  comandafinal = [];
 
  unicos = [];
  
  sinceros = [];
  
  descomprimir = [];

  traelo = [];
  
  
  

  constructor(private sMesas: Mesas1Service, private sProductos: ArticulosService, private sTicket: TicketService, private activatedRouter: ActivatedRoute, 
    private router: Router) {
    }
  ngOnChanges(changes: SimpleChanges): void {}


    ngOnInit(): void {
    
      this.traelo = [];
      this.descomprimir = [];

      this.DesapareceBoton = null;  
      
      this.traerProductos();
      
      this.comandafinal = [];

      

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

    templateRendirMesa(): any{
      if(this.Mesas.liquidada === "true"){
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

    CantidadCeroTraelo(Articulos: any){
      if(Articulos.cantidad === 0){
        return false;

      }else{
        return true;
      }
    }

       
      traerProductos(): void{
      this.sProductos.lista().subscribe(data => {this.producto = data;})
      }

/* En deshuso
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

*/

      AgregarSinRepetir(traelo){

        let repetido = false;
        for(let i=0; i< this.traelo.length; i++)
        {
          if(this.traelo[i].id==traelo.id)
          {
            this.traelo[i].cantidad++
            this.traelo = this.traelo.filter(traelo => traelo.cantidad !=0);
            repetido=true;
          }
        }
        if(repetido == false)
        {
          traelo.cantidad = 1;
          this.traelo = this.traelo.filter(traelo => traelo.cantidad !=0);
          this.traelo.push(traelo);
          
        }
      }

      SacarSinRepetir(traelo){

        let repetido = false;
        for(let i=0; i< this.traelo.length; i++)
        {
          if(this.traelo[i].id==traelo.id)
          {
            this.traelo[i].cantidad--
            this.traelo = this.traelo.filter(traelo => traelo.cantidad !=0);
            repetido=true;
          }
        }
        if(repetido == false)
        {
          this.traelo.push(traelo);
          
        }
      }

      returnZero() {
        return 0
      }

    guardarCambios(){
      
      this.Mesas.comanda = JSON.stringify(this.traelo, ['id','nombre','cantidad','precioventa','imagen'] );
      console.log(this.Mesas.comanda);
    }  

    DevolverLista(){
     this.traelo = JSON.parse(this.Mesas.comanda);
     console.log(this.traelo);
     
    }

    TraeloDale(): any{
     return this.traelo;
    }

    
    
  listadoArticulos: string = '';
  importe: number = 0;
  observacion: string = '';
  fecha: number = Date.now();

  GrabarValoresTicketNuevo(){
    this.Ticket.listadoArticulos = this.Mesas.comanda;
    this.Ticket.importe = this.Mesas.totalComanda;
    this.Ticket.fecha = Date.now();
  }

    NuevoTicket(): void{
      const ticket = new Ticket(this.Mesas.comanda, this.Mesas.totalComanda, this.observacion, this.fecha);
      this.sTicket.save(ticket).subscribe(
        data=>{alert("✅ Ticket creado correctamente");
      
      }, err =>{
        alert("⛔Fallo en la creación del ticket⛔");
        this.router.navigate(['menuarticulos'])
      }
      )
      this.GrabarValoresTicketNuevo();
      console.log(ticket);
    }
  


    onUpdate(): void{
      const id = this.activatedRouter.snapshot.params['id'];
      this.sMesas.update(id, this.Mesas).subscribe(
        data => {alert("✅ Mesa Actualizada");
          this.router.navigate(['']);
        }, err =>{
          alert("⛔ Error al modificar la mesa ⛔");
          this.router.navigate(['']);
        }
      )
      
    }

    ActualizarValoresTicket(): void{
      const id = this.activatedRouter.snapshot.params['id'];
      this.sTicket.update(id, this.Ticket).subscribe(
        data => {alert("✅ Ticket Actualizado");
          this.router.navigate(['']);
        }, err =>{
          alert("⛔ Error al modificar la mesa ⛔");
          this.router.navigate(['']);
        }
      )
      
    }

    guardaYcontinua(): void{
      const id = this.activatedRouter.snapshot.params['id'];
      this.sMesas.update(id, this.Mesas).subscribe(
        data => {alert("✅ Mesa modificada");
          
        }, err =>{
          alert("⛔ Error al modificar la mesa ⛔");
          
        }
      )
      
    }
    
  
    cancelar(): void {
      this.router.navigate(['']);
    }
    
    estado: string = ""; 
    
    guardarTicket(){
      const Ticket = [...this.traelo];
      console.log(Ticket);

    }
    
    abrirMesa(){
      this.Mesas.estado="Abierta";
      this.Mesas.cierre = "true";
      this.Mesas.imagen = "https://res.cloudinary.com/dighitalsoluciones/image/upload/v1666925103/APP%20PARRILLA%20EL%20FOGON/mesaocupadavertical_aot9zk.png";
      this.Mesas.liquidada = "false";
      this.Mesas.totalComanda = 0;
    } 

    cerrarMesa(){
      this.Mesas.estado="Cerrada";
      this.Mesas.cierre = "false";
      this.Mesas.comanda = "";
      this.Mesas.imagen = "https://res.cloudinary.com/dighitalsoluciones/image/upload/v1666925103/APP%20PARRILLA%20EL%20FOGON/mesapendientecobrovertical_pyky9o.png";
      this.traelo = [];
      this.Mesas.liquidada = "true";
    } 
    
    rendirDineroMesa(){
      this.Mesas.estado="Cerrada";
      this.Mesas.cierre="false";
      this.Mesas.cierre="";
      this.Mesas.imagen= "https://res.cloudinary.com/dighitalsoluciones/image/upload/v1666925103/APP%20PARRILLA%20EL%20FOGON/mesalibrevertical_yipjpm.png";
      this.Mesas.liquidada = "false";
      this.Mesas.totalComanda = 0;
      this.onUpdate();
    }
    
    TotalComanda(){
      this.total = 0;
      this.traelo.forEach(Articulos => {
      this.total += Articulos.cantidad * Articulos.precioventa;
      this.Mesas.totalComanda = this.total;
      
    });
    return this.total;
  }

  filtroBarraTabla(): any{
    if(this.total === 0){
      return false;
    }else{
      return true;
    }
  }
}
