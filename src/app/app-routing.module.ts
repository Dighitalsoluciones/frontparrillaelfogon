import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CajaComponent } from './componentes/caja/caja.component';
import { EditarticketComponent } from './componentes/caja/editarticket.component';
import { NuevoegresoComponent } from './componentes/caja/nuevoegreso.component';
import { VistaimpresionComponent } from './componentes/caja/vistaimpresion.component';
import { CajadiariaComponent } from './componentes/cajadiaria/cajadiaria.component';
import { CajadiariaeditarComponent } from './componentes/cajadiaria/cajadiariaeditar.component';
import { EditarproductoComponent } from './componentes/menuproductos/editarproducto.component';
import { MenuproductosComponent } from './componentes/menuproductos/menuproductos.component';
import { NuevoproductoComponent } from './componentes/menuproductos/nuevoproducto.component';
import { ComandacocinaComponent } from './componentes/mesas/comandacocina.component';
import { ComandasmesasComponent } from './componentes/mesas/comandasmesas.component';
import { EditarmesasComponent } from './componentes/mesas/editarmesas.component';
import { MenumesasComponent } from './componentes/mesas/menumesas.component';
import { NuevamesaComponent } from './componentes/mesas/nuevamesa.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EditorPlanoComponent } from './componentes/plano/editor-plano/editor-plano.component';
import { PanelEmpleadosComponent } from './componentes/panel-empleados/panel-empleados.component';
import { VentasScreenComponent } from './componentes/ventas-screen/ventas-screen.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menuarticulos', component: MenuproductosComponent },
  { path: 'nuevoarticulo', component: NuevoproductoComponent },
  { path: 'editarticulo/:id', component: EditarproductoComponent },
  { path: 'menumesas', component: MenumesasComponent },
  { path: 'nuevamesa', component: NuevamesaComponent },
  { path: 'editarmesa/:id', component: EditarmesasComponent },
  { path: 'agregarcomanda/:id', component: ComandasmesasComponent },
  { path: 'caja', component: CajaComponent },
  { path: 'editarticket/:id', component: EditarticketComponent },
  { path: 'vistaticket/:id', component: VistaimpresionComponent },
  { path: 'nuevoegreso', component: NuevoegresoComponent },
  { path: 'cajadiaria', component: CajadiariaComponent },
  { path: 'formadepago/:id', component: CajadiariaeditarComponent },
  { path: 'comandacocina/:id', component: ComandacocinaComponent },
  { path: 'verplano', component: EditorPlanoComponent },
  { path: 'colaboradores', component: PanelEmpleadosComponent },
  { path: 'ventas', component: VentasScreenComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
