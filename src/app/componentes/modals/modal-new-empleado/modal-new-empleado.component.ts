import { Component, ElementRef, OnInit } from '@angular/core';
import { Empleado } from 'src/app/Model/empleado';
import { EmpleadoService } from 'src/app/Service/empleado.service';

@Component({
  selector: 'app-modal-new-empleado',
  templateUrl: './modal-new-empleado.component.html',
  styleUrls: ['./modal-new-empleado.component.css']
})

export class ModalNewEmpleadoComponent implements OnInit {

  //Propiedades para crear empleado
  codigo: string = "";
  nombre: string = "";
  contacto: string = "";
  editar: boolean = false;

  constructor(private serviceEmpleado: EmpleadoService) { }

  ngOnInit(): void {
  }

  crearEmpleado() {
    const empleado = new Empleado(this.codigo, this.nombre, this.contacto, this.editar);
    this.serviceEmpleado.save(empleado).subscribe(data => {
      alert("✅ Colaborador registrado correctamente");
      location.reload();
    }, err => {
      alert("⛔ Debes completar todos los campos ⛔");
    })
  }

}
