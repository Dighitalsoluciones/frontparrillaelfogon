import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vistaimpresion',
  templateUrl: './vistaimpresion.component.html',
  styleUrls: ['./vistaimpresion.component.css']
})
export class VistaimpresionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
  
imprimir(){
  window.print();
}

FechaTicket: string = formatDate(Date.now(), 'dd/MM/yyyy hh:mm:ss', 'en-US');
}
