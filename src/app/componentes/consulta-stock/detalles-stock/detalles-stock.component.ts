import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovimientoStock } from 'src/app/Model/movimiento-stock';
import { MovimientoStockService } from 'src/app/Service/movimiento-stock.service';
import { SpinnerService } from 'src/app/Service/spinner.service';

@Component({
  selector: 'app-detalles-stock',
  templateUrl: './detalles-stock.component.html',
  styleUrls: ['./detalles-stock.component.css']
})
export class DetallesStockComponent implements OnInit {

  movimientoStock: MovimientoStock | null = null;
  listadoDeItem = [];

  constructor(private serviceMovimientoStock: MovimientoStockService, private activatedRoute: ActivatedRoute,
    private router: Router, private serviceSpinner: SpinnerService) { }

  ngOnInit(): void {
    this.serviceSpinner.llamarSpinner();
    const id = this.activatedRoute.snapshot.params['id'];
    this.serviceMovimientoStock.details(id).subscribe(
      data => {
        this.movimientoStock = data;
        this.listadoDeItem = JSON.parse(this.movimientoStock.listadoItem);
        this.serviceSpinner.pararSpinner();
      }, err => {
        alert("Error al obtener los detalles del movimiento de stock");
        this.router.navigate(['movimientosstock']);
        this.serviceSpinner.pararSpinner();
      }
    )
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.serviceMovimientoStock.update(id, this.movimientoStock).subscribe(
      data => {
        alert("✅ Movimiento de Stock modificado correctamente");
        this.router.navigate(['menuarticulos']);
      }, err => {
        alert("⛔ Error al modificar el articulo ⛔");
        this.router.navigate(['movimientosstock']);
      }
    )

  }

}
