import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MesasComponent } from './componentes/mesas/mesas.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BarrainicialComponent } from './componentes/barrainicial/barrainicial.component';
import { MenuproductosComponent } from './componentes/menuproductos/menuproductos.component';
import { NuevoproductoComponent } from './componentes/menuproductos/nuevoproducto.component';
import { EditarproductoComponent } from './componentes/menuproductos/editarproducto.component';
import { FiltroarticulosPipe } from './pipes/filtroarticulos.pipe';
import { NuevamesaComponent } from './componentes/mesas/nuevamesa.component';
import { MenumesasComponent } from './componentes/mesas/menumesas.component';
import { FiltrarmesasPipe } from './pipes/filtrarmesas.pipe';
import { EditarmesasComponent } from './componentes/mesas/editarmesas.component';
import { ComandasmesasComponent } from './componentes/mesas/comandasmesas.component';
import { CajaComponent } from './componentes/caja/caja.component';
import { EditarticketComponent } from './componentes/caja/editarticket.component';
import { VistaimpresionComponent } from './componentes/caja/vistaimpresion.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NuevoegresoComponent } from './componentes/caja/nuevoegreso.component';
import { CajadiariaComponent } from './componentes/cajadiaria/cajadiaria.component';
import { CajadiariaeditarComponent } from './componentes/cajadiaria/cajadiariaeditar.component';
import { ComandacocinaComponent } from './componentes/mesas/comandacocina.component';
import { PlanoComponent } from './componentes/plano/plano.component';
import { EditorPlanoComponent } from './componentes/plano/editor-plano/editor-plano.component';
import { ModalNewObjetoComponent } from './componentes/modals/modal-new-objeto/modal-new-objeto.component';
import { PanelEmpleadosComponent } from './componentes/panel-empleados/panel-empleados.component';
import { ModalNewEmpleadoComponent } from './componentes/modals/modal-new-empleado/modal-new-empleado.component';
import { ModalFormaPagoComponent } from './componentes/modals/modal-forma-pago/modal-forma-pago.component';
import { VentasScreenComponent } from './componentes/ventas-screen/ventas-screen.component';
import { FiltrararticulosvendidosPipe } from './pipes/filtrararticulosvendidos.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MesasComponent,
    HomeComponent,
    LoginComponent,
    BarrainicialComponent,
    MenuproductosComponent,
    NuevoproductoComponent,
    EditarproductoComponent,
    FiltroarticulosPipe,
    NuevamesaComponent,
    MenumesasComponent,
    FiltrarmesasPipe,
    EditarmesasComponent,
    ComandasmesasComponent,
    CajaComponent,
    EditarticketComponent,
    VistaimpresionComponent,
    NuevoegresoComponent,
    CajadiariaComponent,
    CajadiariaeditarComponent,
    ComandacocinaComponent,
    PlanoComponent,
    EditorPlanoComponent,
    ModalNewObjetoComponent,
    PanelEmpleadosComponent,
    ModalNewEmpleadoComponent,
    ModalFormaPagoComponent,
    VentasScreenComponent,
    FiltrararticulosvendidosPipe,
  
    
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,


    

  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
