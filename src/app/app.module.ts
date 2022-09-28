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


@NgModule({
  declarations: [
    AppComponent,
    MesasComponent,
    HomeComponent,
    LoginComponent,
    BarrainicialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

    

  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
