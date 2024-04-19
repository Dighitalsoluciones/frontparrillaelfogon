import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Mesas1 } from 'src/app/Model/mesas1';

@Component({
  selector: 'app-modal-forma-pago',
  templateUrl: './modal-forma-pago.component.html',
  styleUrls: ['./modal-forma-pago.component.css']
})
export class ModalFormaPagoComponent implements OnInit {

  lista = ["EFECTIV", "MP"];
  formaDePago: string = "";
  conCuantoPaga: number = 0;
  calculoVuelto: number = 0;
  valorTicket: number;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
   
  }

}
