import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CajaComponent } from './componentes/caja/caja.component';
import { EditarticketComponent } from './componentes/caja/editarticket.component';
import { VistaimpresionComponent } from './componentes/caja/vistaimpresion.component';
import { EditarproductoComponent } from './componentes/menuproductos/editarproducto.component';
import { MenuproductosComponent } from './componentes/menuproductos/menuproductos.component';
import { NuevoproductoComponent } from './componentes/menuproductos/nuevoproducto.component';
import { ComandasmesasComponent } from './componentes/mesas/comandasmesas.component';
import { EditarmesasComponent } from './componentes/mesas/editarmesas.component';
import { MenumesasComponent } from './componentes/mesas/menumesas.component';
import { NuevamesaComponent } from './componentes/mesas/nuevamesa.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path: 'menuarticulos', component: MenuproductosComponent},
  {path: 'nuevoarticulo', component: NuevoproductoComponent},
  {path: 'editarticulo/:id', component: EditarproductoComponent},
  {path: 'menumesas', component: MenumesasComponent},
  {path: 'nuevamesa', component: NuevamesaComponent},
  {path: 'editarmesa/:id', component: EditarmesasComponent},
  {path: 'agregarcomanda/:id', component: ComandasmesasComponent},
  {path: 'caja', component: CajaComponent},
  {path: 'editarticket/:id', component: EditarticketComponent},
  {path: 'vistaticket', component: VistaimpresionComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
