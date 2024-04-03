import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Mesas1 } from 'src/app/Model/mesas1';
import { Mesas1Service } from 'src/app/Service/mesas1.service';
import { ObjetosMapaServiceService } from 'src/app/Service/objetos-mapa-service.service';
import { Objetosmapa } from 'src/app/Model/objetosmapa';

@Component({
  selector: 'app-plano',
  templateUrl: './plano.component.html',
  styleUrls: ['./plano.component.css']
})
export class PlanoComponent implements OnInit {

  @Input() bloquearArrastre: boolean;
  @Input() noMostrarLink: boolean = false;

  objetoSeleccionado: any = null;
  mesaSeleccionada: any = null;

  mesas: Mesas1[];
  imagenTransform = '';
  permiteEditar: boolean = false;
  objetosMapa: Objetosmapa[];
  mostrarBoton: boolean = false;

  //Creación objetos mapa
  imagen: string;
  x: number = 0;
  y: number = 0;
  rotacion: number = 0;
  ancho: number = 0;
  largo: number = 0;
  texto: string;
  colorText: string;


  constructor(private mesaService: Mesas1Service, private objetosMapaService: ObjetosMapaServiceService) { }

  ngOnInit(): void {
    this.traerMesas();
    this.traerObjetosMapa();

  }

  seleccionarObjeto(objeto: Objetosmapa) {
    this.objetoSeleccionado = objeto;
  }

  seleccionarMesas(mesa: Mesas1) {
    this.mesaSeleccionada = mesa;
  }


  traerMesas() {
    this.mesaService.lista().subscribe(data => {
      this.mesas = data;
      this.mesas.forEach(mesa => {
        mesa.x = mesa.x || 0; // Asigna 0 si x es undefined
        mesa.y = mesa.y || 0; // Asigna 0 si y es undefined
      });
    });
  }

  traerObjetosMapa() {
    this.objetosMapaService.lista().subscribe(data => {
      this.objetosMapa = data;
      this.objetosMapa.forEach(objetosMapa => {
        objetosMapa.x = objetosMapa.x || 0; // Asigna 0 si x es undefined
        objetosMapa.y = objetosMapa.y || 0; // Asigna 0 si y es undefined
      });
    });
  }


  onDragEnded(event: CdkDragEnd, mesa: Mesas1) {
    mesa.x += event.distance.x;
    mesa.y += event.distance.y;

  }

  onDragEndedObjetos(event: CdkDragEnd, objetos: Objetosmapa) {
    objetos.x += event.distance.x;
    objetos.y += event.distance.y;

  }

  grabarEnBd() {
    this.mesaService.updateAllMesas(this.mesas).subscribe(
      response => {
        console.log('Posiciones actualizadas en la base de datos');
      },
      error => {
        console.error('Error al actualizar posiciones:', error);
      }
    );
    this.objetosMapaService.updateAllMesas(this.objetosMapa).subscribe(
      response => {
        alert("✅ Cambios guardados");
        console.log('Posiciones actualizadas en la base de datos');
      },
      error => {
        console.error('Error al actualizar posiciones:', error);
      }
    );
  }

  habilitarEdicion() {
    this.permiteEditar = true;
  }

  deshabilitarEdicion() {
    this.permiteEditar = false;
  }

  visualizarBoton(objeto: Objetosmapa) {
    if (objeto.texto != "") {
      this.mostrarBoton = true;
    } else {
      this.mostrarBoton = false;
    }

  }

  rotarMesa(mesa: Mesas1, grados: number) {
    let id = mesa.id;
    mesa.rotacion += grados;
    mesa.rotacion %= 360; // Asegúrate de mantener el ángulo dentro de 0-359 grados
    this.mesaService.update(id, mesa).subscribe(
      data => { },
    );
  }

  rotarObjetos(objeto: Objetosmapa, grados: number) {
    let id = objeto.id;
    objeto.rotacion += grados;
    objeto.rotacion %= 360; // Nos aseguramos de mantener el ángulo dentro de 0-359 grados
    this.objetosMapaService.update(id, objeto).subscribe(
      data => { },
    );
  }

  alargarObjetos(objeto: Objetosmapa, largo: number) {
    let id = objeto.id;
    objeto.largo += largo;
    this.objetosMapaService.update(id, objeto).subscribe();
  }

  ensancharObjetos(objeto: Objetosmapa, ancho: number) {
    let id = objeto.id;
    objeto.ancho += ancho;
    this.objetosMapaService.update(id, objeto).subscribe();
  }

  onCreateObjetosMapa(): void {
    const objetosMapa = new Objetosmapa(this.imagen, this.x, this.y, this.rotacion, this.ancho,
      this.largo, this.texto, this.colorText);
    this.objetosMapaService.save(objetosMapa).subscribe(
      data => {
        alert("✅ Objeto creado correctamente");
      }, err => {
        alert("⛔Fallo en la creación del objeto, debes completar todos los campos⛔");
      }
    )
  }



}