import { Component, OnInit } from '@angular/core';
import { Mesas1 } from 'src/app/Model/mesas1';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  caja = [{id:1, nombre:'perro', cantidad: 6}, {id:2, nombre:'gato', cantidad: 10}];

}
