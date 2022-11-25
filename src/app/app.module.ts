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
import { Mesas2Component } from './componentes/mesas/mesas2.component';


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
    Mesas2Component,
    
   
    
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
