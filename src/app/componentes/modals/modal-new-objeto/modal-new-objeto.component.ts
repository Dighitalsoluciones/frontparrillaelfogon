import { Component, OnInit } from '@angular/core';
import { Objetosmapa } from 'src/app/Model/objetosmapa';
import { ObjetosMapaServiceService } from 'src/app/Service/objetos-mapa-service.service';

@Component({
  selector: 'app-modal-new-objeto',
  templateUrl: './modal-new-objeto.component.html',
  styleUrls: ['./modal-new-objeto.component.css']
})
export class ModalNewObjetoComponent implements OnInit {

  objetosMapa: Objetosmapa[];

  //Creación objetos mapa
  imagen: string;
  x: number = 0;
  y: number = 0;
  rotacion: number = 0;
  ancho: number = 0;
  largo: number = 0;
  texto: string;
  colorText: string;

  comboTipoObjeto: string
  colorElegido: string
  lista: string[] = ["BARRA", "TEXTO", "CUBO"];
  listaColores: string[] = ["RED", "WHITE", "BLACK"];

  constructor(private objetosMapaService: ObjetosMapaServiceService) { }

  ngOnInit(): void {
  }

  creacionSegunSeleccion() {
    if (this.comboTipoObjeto == "BARRA") {
      this.imagen = "https://res.cloudinary.com/dighitalsoluciones/image/upload/v1711398835/APP%20PARRILLA%20EL%20FOGON/barra_ud4i0r.png";
      this.x = 33;
      this.y = -870;
      this.rotacion = 0;
      this.ancho = 10;
      this.largo = 100;
      this.texto = "";
      this.colorText = "";

      this.onCreateObjetosMapa();
    } else if (this.comboTipoObjeto == "TEXTO") {
      this.imagen = "";
      this.x = 33;
      this.y = -870;
      this.rotacion = 0;
      this.ancho = 0;
      this.largo = 0;
      this.texto = this.texto;
      this.colorText = this.colorElegido;
      this.onCreateObjetosMapa();
    } else {
      this.imagen = "https://res.cloudinary.com/dighitalsoluciones/image/upload/v1712024512/APP%20PARRILLA%20EL%20FOGON/CUADRADO_exyf0d.png";
      this.x = 33;
      this.y = -870;
      this.rotacion = 0;
      this.ancho = 100;
      this.largo = 100;
      this.texto = "";
      this.colorText = "";
      this.onCreateObjetosMapa();
    }
  }

  onCreateObjetosMapa(): void {
    const objetosMapa = new Objetosmapa(this.imagen, this.x, this.y, this.rotacion, this.ancho,
      this.largo, this.texto, this.colorText);
    this.objetosMapaService.save(objetosMapa).subscribe(
      data => {
        alert("✅ Objeto creado correctamente");
        location.reload();
      }, err => {
        alert("⛔Fallo en la creación del objeto, debes completar todos los campos⛔");
      }
    )
  }

}
