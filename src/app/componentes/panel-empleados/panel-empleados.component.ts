import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from 'src/app/Model/empleado';
import { EmpleadoService } from 'src/app/Service/empleado.service';

@Component({
  selector: 'app-panel-empleados',
  templateUrl: './panel-empleados.component.html',
  styleUrls: ['./panel-empleados.component.css']
})
export class PanelEmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];

  empleado: Empleado | null = null;

  //Propiedades que reemplazan a las originales de clase Empleado.
  newCodigo: string = "";
  newNombre: string = "";
  newContacto: string = "";

  constructor(private serviceEmpleado: EmpleadoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.traerEmpleados();

  }

  traerEmpleados() {
    this.serviceEmpleado.lista().subscribe(data => { this.empleados = data });
  }

  editarEmpleado(id: number, empleado: Empleado) {
    if (empleado.id === id) {
      empleado.editar = true;
    }
  }

  cancelarEditarEmpleado(id: number, empleado: Empleado) {
    if (empleado.id === id) {
      empleado.editar = false;
    }
  }

  actualizarEmpleado(id: number, empleado: Empleado) {
    this.serviceEmpleado.update(id, empleado).subscribe();
    alert("✅ Datos modificado/s correctamente");
    location.reload();
  }

  eliminarEmpleado(id: number) {
    if (confirm("✅ ¿Estás seguro de que quieres eliminar los datos?")) {
      this.serviceEmpleado.delete(id).subscribe();
      location.reload();
    } else {
      console.log("Operación cancelada");
    }


  }

}
