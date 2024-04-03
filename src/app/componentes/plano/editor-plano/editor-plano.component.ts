import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanoComponent } from '../plano.component';
import { Mesas1 } from 'src/app/Model/mesas1';
import { Mesas1Service } from 'src/app/Service/mesas1.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor-plano',
  templateUrl: './editor-plano.component.html',
  styleUrls: ['./editor-plano.component.css']
})
export class EditorPlanoComponent implements OnInit {

  @ViewChild(PlanoComponent) planoComponent: PlanoComponent;
  mesas: Mesas1[];
  permiteEditar: boolean = false;
  noMostrarLink = true;

  constructor(private mesaService: Mesas1Service, private router: Router) { }

  ngOnInit(): void {
  }

  llamarGrabarEnBd() {
    this.planoComponent.grabarEnBd();
  }

  llamarHabilitarEdicion() {
    this.planoComponent.habilitarEdicion();
    this.permiteEditar = true;
    
  }

  llamarDeshabilitarEdicion() {
    this.planoComponent.deshabilitarEdicion();
    this.permiteEditar = false;
  }

  atras() {
    this.router.navigate(['']);
  }

}
