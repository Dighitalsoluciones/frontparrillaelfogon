import { Component, OnInit } from '@angular/core';
import { Articulos } from 'src/app/Model/articulos';
import { ArticulosService } from 'src/app/Service/articulos.service';
import { CompartidoService } from 'src/app/Service/compartido.service';

@Component({
  selector: 'app-modal-add-art',
  templateUrl: './modal-add-art.component.html',
  styleUrls: ['./modal-add-art.component.css']
})
export class ModalAddArtComponent implements OnInit {

  articulos: Articulos[] = [];

  busquedaPorNombre: boolean = true;
  busquedaPorCodigo: boolean = false;
  busquedaPorFamilia: boolean = false;

  pipeNombre = [];
  pipeCodigo = [];
  pipeFamilia = [];

  inputCantidad: number = 0;

  constructor(private serviceArticulo: ArticulosService, private serviceCompartido: CompartidoService) { }

  ngOnInit(): void {
    this.traerArticulos();
  }

  traerArticulos() {
    this.serviceArticulo.lista().subscribe(data => { this.articulos = data; })
  }

  onSwitchChange(switchName: string) {
    this.busquedaPorNombre = false;
    
    this.busquedaPorFamilia = false;

    switch (switchName) {
      case 'nombre':
        this.busquedaPorNombre = true;
        break;
     
      case 'familia':
        this.busquedaPorFamilia = true;
        break;
    }
  }

  agregarItem(item: any, cantidad: number) {
    // Guardar la cantidad en una variable temporal
    let tempCantidad = cantidad;
    // Resetear la cantidad del item a 0
    item.cantidad = 0;
    // Pasar la cantidad original al servicio
    this.serviceCompartido.updateData({ ...item, cantidad: tempCantidad });
  }

}
