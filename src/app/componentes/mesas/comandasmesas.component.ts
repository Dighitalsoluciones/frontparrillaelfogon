import { formatDate } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulos } from 'src/app/Model/articulos';
import { Empleado } from 'src/app/Model/empleado';
import { Mesas1 } from 'src/app/Model/mesas1';
import { Recibos } from 'src/app/Model/recibos';
import { Ticket } from 'src/app/Model/ticket';
import { ArticulosService } from 'src/app/Service/articulos.service';
import { EmpleadoService } from 'src/app/Service/empleado.service';
import { Mesas1Service } from 'src/app/Service/mesas1.service';
import { RecibosService } from 'src/app/Service/recibos.service';
import { TicketService } from 'src/app/Service/ticket.service';


@Component({
  selector: 'app-comandasmesas',
  templateUrl: './comandasmesas.component.html',
  styleUrls: ['./comandasmesas.component.css']
})
export class ComandasmesasComponent implements OnInit, OnChanges {
  /*agregado del spinner loading y cargado*/
  loading = true;
  cargado = false;

  Mesas: Mesas1 = null;
  total: number = 0;
  producto: Articulos[] = [];
  Ticket: Ticket | null = null;

  empleados: Empleado[] = [];

  //Propiedades para el modal forma de pago
  lista = ["EFECTIV", "MP"];
  formaDePagoRecibo: string = "EFECTIV";
  conCuantoPaga: number = 0;

  meseroSeleccionado: string = "";

  TicketCocina = "none";

  verabrirdespuesdelcierre = "true";

  displayStyle = "none";

  modalRendirCaja = "none";

  botonAgregarArticulos = "none"

  verAbrirMesas = "none";

  verComanda = "none";

  verGuardar = "none";

  verSoloImpresion = "none";

  VistaNormal = "true";

  cerrar = false;

  condicionIf = false;

  btnVaciar: boolean = false;

  comandaCocina() {
    // this.guardarCambios();
    // this.guardaYcontinua();
    this.TicketCocina = "block";
    this.VistaNormal = "none";
    this.DevolverLista();
  }

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  openPopupRendirMesa() {
    this.modalRendirCaja = "block";
  }
  closePopupRendirMesa() {
    this.modalRendirCaja = "none";
  }

  mostrarComanda() {
    this.verComanda = "block";
  }

  cambioCierre() {
    this.cerrar = true;
  }

  verBotonAgregar() {
    this.botonAgregarArticulos = "block";
    this.displayStyle = "none";
  }

  verBotonGuardar() {
    this.verGuardar = "block";
  }

  nomostrardespuesdelcierre() {
    this.verabrirdespuesdelcierre = "none";
  }

  MostrarVistaImpresion() {
    // this.guardarCambios();
    // this.guardaYcontinua();

    this.verSoloImpresion = "block";
    this.DevolverLista();
    this.VistaNormal = "none";
    this.Mesas.impresion = "true";
    this.guardaYcontinua2();
    this.NuevoTicket();

  }

  DesapareceBoton = 0;

  comandafinal = [];

  unicos = [];

  sinceros = [];

  descomprimir = [];

  traelo = [];

  inputValue: string = '';


  constructor(private sMesas: Mesas1Service, private sProductos: ArticulosService, private sTicket: TicketService, private sRecibos: RecibosService, private activatedRouter: ActivatedRoute,
    private router: Router, private serviceEmpleado: EmpleadoService) {
  }
  filtrarArticulos = [];

  public getInputValue(inputValue: string) {
    console.log(inputValue);

  }


  ngOnChanges(changes: SimpleChanges): void { }


  ngOnInit(): void {
    /*agregado del spinner funcion de setTimeout 131 a 134*/
    setTimeout(() => {
      this.loading = false;
      this.cargado = true;
    }, 1500);

    this.listarEmpleados();

    this.traelo = [];
    this.descomprimir = [];

    this.DesapareceBoton = null;

    this.traerProductos();

    this.comandafinal = [];

    const id = this.activatedRouter.snapshot.params['id'];
    this.sMesas.details(id).subscribe(
      data => {
        this.Mesas = data;
      }, err => {
        alert("Error al modificar la mesa");
        this.router.navigate(['']);
      }
    );

  }

  listarEmpleados() {
    this.serviceEmpleado.lista().subscribe(data => { this.empleados = data });
  }

  verBoton(): any {
    if (this.Mesas.cierre === "true") {
      return false;

    } else {
      return true;
    }
  }

  NoVerBoton(): any {
    if (this.Mesas.cierre === "true") {
      return true;

    } else {
      return false;
    }
  }

  verBotonAgrega(): any {
    if (this.Mesas.cierre === "true") {
      return true;

    } else {
      return false;
    }
  }

  templateRendirMesa(): any {
    if (this.Mesas.liquidada === "true") {
      return true;
    } else {
      return false;
    }
  }

  /* Agregado 6/12/22 */
  templateImprimir(): any {
    if (this.Mesas.impresion === "false") {
      return true;
    } else {
      return false;
    }
  }

  CantidadCero(Articulos: any) {
    if (Articulos.cantidad === 0) {
      return false;

    } else {
      return true;
    }
  }

  CantidadCeroTraelo(Articulos: any) {
    if (Articulos.cantidad === 0) {
      return false;

    } else {
      return true;
    }
  }

  traerProductos(): void {
    this.sProductos.lista().subscribe(data => { this.producto = data; })
  }

  AgregarSinRepetir(traelo) {
    let producto = this.producto.find(item => item.id == traelo.id);
    let repetido = false;
    for (let i = 0; i < this.traelo.length; i++) {
      if (this.traelo[i].id == traelo.id) {
        if (producto.stock > 0) {
          this.traelo[i].cantidad++
          producto.stock--
          this.sProductos.update(producto.id, producto).subscribe(data => {
            console.log("stock actualizado id: " + producto.id);
          });
          this.traelo = this.traelo.filter(traelo => traelo.cantidad != 0);
          repetido = true;
        }
      }
    }
    if (repetido == false) {
      if (producto.stock > 0) {
        traelo.cantidad = 1;
        producto.stock--
        this.sProductos.update(producto.id, producto).subscribe(data => {
          console.log("stock actualizado id: " + producto.id);
        });
        this.traelo = this.traelo.filter(traelo => traelo.cantidad != 0);
        this.traelo.push(traelo);
      }
    }
  }

  SacarSinRepetir(traelo) {
    let producto = this.producto.find(item => item.id == traelo.id);
    let repetido = false;
    for (let i = 0; i < this.traelo.length; i++) {
      if (this.traelo[i].id == traelo.id) {
        this.traelo[i].cantidad--
        producto.stock++
        this.sProductos.update(producto.id, producto).subscribe(data => {
          console.log("stock actualizado id: " + producto.id);
        });
        this.traelo = this.traelo.filter(traelo => traelo.cantidad != 0);
        repetido = true;
      }
    }
    if (repetido == false) {
      this.TotalComanda();

    }
  }

  SacarSinRepetirExistente(traelo) {
    let producto = this.producto.find(item => item.id == traelo.id);
    let repetido = false;
    for (let i = 0; i < this.traelo.length; i++) {
      if (this.traelo[i].id == traelo.id) {
        this.traelo[i].cantidad--;
        producto.stock++;
        this.sProductos.update(producto.id, producto).subscribe(data => {
          console.log("stock actualizado id: " + producto.id);
        });
        repetido = true;
      }
    }
    this.traelo = this.traelo.filter(traelo => traelo.cantidad != 0);
    if (repetido == false) {
    }
  }

  returnZero() {
    return 0
  }

  guardarCambios() {

    this.Mesas.comanda = JSON.stringify(this.traelo, ['id', 'nombre', 'cantidad', 'precioventa', 'imagen']);
  }

  DevolverLista() {
    try {
      this.traelo = JSON.parse(this.Mesas.comanda);
      this.btnVaciar = true;
    } catch (error) {
      console.error('Error al analizar JSON:', error);
    }
  }

  TraeloDale(): any {
    return this.traelo;
  }

  VerNumero() {
    console.log(this.Mesas.numeroMesa);
  }


  //Creacion de nuevo Ticket
  listadoArticulos: string = '';
  importe: number = 0;
  observacion: string = '';
  fecha: string = formatDate(Date.now(), 'dd/MM/yyyy hh:mm:ss', 'en-US');
  numerodeMesa: string = '';
  formadepago: string = 'EFECTIV';
  mesero: string = "";
  numeroTicket: number = 0;
  fechaTicket: string = '';
  check: string = "";

  GrabarValoresTicketNuevo() {
    this.Ticket.listadoArticulos = this.Mesas.comanda;
    this.Ticket.importe = this.Mesas.totalComanda;
    this.Ticket.fecha = formatDate(Date.now(), 'dd/MM/yyyy hh:mm:ss', 'en-US');
    this.Ticket.numerodeMesa = this.Mesas.numeroMesa;
    this.Ticket.formadepago = this.formadepago;
    this.Ticket.check = "false";
  }

  NuevoTicket(): void {
    if (this.Mesas.totalComanda != 0) {
      var mesero = this.Mesas.mesero;
      const ticket = new Ticket(this.Mesas.comanda, this.Mesas.totalComanda, this.observacion, this.fecha,
        this.Mesas.numeroMesa, this.formadepago, this.check, mesero);
      this.sTicket.save(ticket).subscribe(
        data => {
          alert("✅ Ticket creado correctamente");
        }, err => {
          alert("⛔Fallo en la creación del ticket⛔");
          this.router.navigate(['menuarticulos'])
        }
      )
      this.GrabarValoresTicketNuevo();
      this.numeroTicket = ticket.id;
      this.fechaTicket = ticket.fecha;
    } else {
      this.cancelar();
    }

  }




  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sMesas.update(id, this.Mesas).subscribe(
      data => {
        ;
        this.router.navigate(['']);
      }, err => {
        alert("⛔ Error al modificar la mesa ⛔");
        this.router.navigate(['']);
      }
    )

  }

  ActualizarValoresTicket(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sTicket.update(id, this.Ticket).subscribe(
      data => {
        alert("✅ Ticket Actualizado");
        this.router.navigate(['']);
      }, err => {
        alert("⛔ Error al modificar la mesa ⛔");
        this.router.navigate(['']);
      }
    )

  }

  guardaYcontinua(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sMesas.update(id, this.Mesas).subscribe(
      data => {
        ;

      }, err => {
        alert("⛔ Error al modificar la mesa ⛔");

      }
    )

  }

  guardaYcontinua2(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sMesas.update(id, this.Mesas).subscribe(
      data => {
        ;

      }, err => {
        alert("⛔ Error al modificar la mesa ⛔");

      }
    )

  }


  cancelar(): void {
    if (this.traelo.length === 0) {
      this.DevolverLista();
      this.guardarCambios();
      this.guardaYcontinua2();
      this.router.navigate(['']);
    } else {
      this.guardarCambios();
      this.guardaYcontinua2();
      this.router.navigate(['']);
    }
  }

  cancelarMenuMesas(): void {
    this.Mesas.impresion = "true";
    this.guardaYcontinua2();
    this.router.navigate(['']);
  }

  estado: string = "";

  guardarTicket() {
    const Ticket = [...this.traelo];
    console.log(Ticket);

  }

  abrirMesa() {
    this.Mesas.estado = "Abierta";
    this.Mesas.cierre = "true";
    this.Mesas.imagen = "https://res.cloudinary.com/dighitalsoluciones/image/upload/v1666925103/APP%20PARRILLA%20EL%20FOGON/mesaocupadavertical_aot9zk.png";
    this.Mesas.liquidada = "false";
    this.Mesas.totalComanda = 0;
    this.traelo = [];
    this.Mesas.comanda = "";
    this.Mesas.impresion = "false";
  }

  cerrarMesa() {
    this.DevolverLista();
    this.verComanda = "none";
    this.Mesas.estado = "Cerrada";
    this.Mesas.cierre = "false";
    this.Mesas.imagen = "https://res.cloudinary.com/dighitalsoluciones/image/upload/v1666925103/APP%20PARRILLA%20EL%20FOGON/mesapendientecobrovertical_pyky9o.png";
    this.Mesas.liquidada = "true";
    this.Mesas.comanda = JSON.stringify(this.traelo);
    this.nomostrardespuesdelcierre();
    this.guardaYcontinua();
  }

  //para crear recibos
  corresTicket: number = 0;
  checkEdR: string = "false";

  NuevoRecibo(): void {
    if (this.Mesas.totalComanda != 0) {
      const recibos = new Recibos(this.fecha, this.corresTicket, this.Mesas.totalComanda, this.observacion, this.Mesas.numeroMesa, this.formaDePagoRecibo, this.checkEdR);
      this.sRecibos.save(recibos).subscribe(
        data => {
          alert("✅ Recibo generado correctamente");
          this.Mesas.impresion = "true";
        }, err => {
          alert("⛔Fallo en la creación del recibo⛔");
          this.router.navigate(['caja'])
        }
      )
    } else {
      this.Mesas.estado = "Cerrada";
      this.Mesas.cierre = "false";
      this.Mesas.cierre = "";
      this.Mesas.imagen = "https://res.cloudinary.com/dighitalsoluciones/image/upload/v1666925103/APP%20PARRILLA%20EL%20FOGON/mesalibrevertical_yipjpm.png";
      this.Mesas.liquidada = "false";
      this.Mesas.totalComanda = 0;
      this.Mesas.impresion = "false";
      this.onUpdate();
      this.router.navigate(['']);
    }
  }


  rendirDineroMesa() {
    if (this.Mesas.impresion === "false") {
      this.openPopupRendirMesa();
    } else {
      this.Mesas.estado = "Cerrada";
      this.Mesas.cierre = "false";
      this.Mesas.cierre = "";
      this.Mesas.imagen = "https://res.cloudinary.com/dighitalsoluciones/image/upload/v1666925103/APP%20PARRILLA%20EL%20FOGON/mesalibrevertical_yipjpm.png";
      this.Mesas.liquidada = "false";
      this.Mesas.mesero = "";
      this.NuevoRecibo();
      this.Mesas.totalComanda = 0;
      this.Mesas.impresion = "false";
      this.onUpdate();
      this.router.navigate(['']);
      alert("Presiona Enter para continuar");
    }
  }

  desbloqueoDeRendirDinero() {
    this.Mesas.impresion = "true";
    this.guardaYcontinua();
  }

  abarcativaRendirMesa() {
    if (this.Mesas.totalComanda != 0) {
      this.desbloqueoDeRendirDinero();
      this.rendirDineroMesa();
      this.verBotonGuardar();
      this.Mesas.liquidada === "true";
      this.guardaYcontinua();
      this.router.navigate(['']);
    } else {
      this.closePopupRendirMesa();
      this.desbloqueoDeRendirDinero();
      this.rendirDineroMesa();
      this.verBotonGuardar();
    }

  }

  TotalComanda() {
    this.total = 0;
    this.traelo.forEach(Articulos => {
      this.total += Articulos.cantidad * Articulos.precioventa;
      this.Mesas.totalComanda = this.total;

    });
    return this.total;
  }

  filtroBarraTabla(): any {
    if (this.total === 0) {
      return false;
    } else {
      return true;
    }
  }

  FechaTicket: string = formatDate(Date.now(), 'dd/MM/yyyy hh:mm:ss', 'en-US');

  ImprimirTicket() {
    this.Mesas.impresion = "true";
    this.guardaYcontinua2();
    window.print();
  }
  ImprimirCocina() {
    this.guardaYcontinua2();
    window.print();
  }

  volverAtras() {
    location.reload();
  }

  volverAtrasEnImpreso() {
    this.Mesas.impresion = "true";
    this.guardaYcontinua2();
    location.reload();
  }

  modificaciones() {
    if (this.TotalComanda() === this.Mesas.totalComanda) {
      return true;
    } else {
      return false;
    }
  }

  vaciarMesa() {
    this.traelo = [];
    this.Mesas.comanda = "";
    this.Mesas.totalComanda = 0;
    this.guardarCambios();
    this.guardaYcontinua3();
  }

  guardaYcontinua3(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sMesas.update(id, this.Mesas).subscribe(
      data => {
        alert("✅ Cambios Guardados");;

      }, err => {
        alert("⛔ Error al modificar la mesa ⛔");

      }
    )

  }

  //Se resolvio la actualizacion de stock de otra manera, cada vez que se agrega o se descuenta items, y no por
  //finalizacion del ticket. Para tener el stock en tiempo real.
  // //Para actualizar stock
  saveStock() {
    for (let item of this.traelo) {
      this.sProductos.details(item.id).subscribe(
        data => {
          let nuevoStock = data.stock - item.cantidad;
          if (nuevoStock >= 0) {
            data.stock = nuevoStock;
            this.sProductos.update(item.id, data).subscribe(
              data => {
                console.log('Stock actualizado con éxito');
              },
              error => {
                console.error('Error actualizando el stock', error);
              }
            );
          } else {
            console.error('La cantidad es mayor que el stock disponible');
          }
        },
        error => {
          console.error('Error obteniendo el artículo', error);
        }
      );
    }
  }

}