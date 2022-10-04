import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarproductoComponent } from './componentes/menuproductos/editarproducto.component';
import { MenuproductosComponent } from './componentes/menuproductos/menuproductos.component';
import { NuevoproductoComponent } from './componentes/menuproductos/nuevoproducto.component';
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
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }