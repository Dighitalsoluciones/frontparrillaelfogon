import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulos } from '../Model/articulos';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  artURL = 'https://bkparrillaelfogon-5526d4bf3ec2.herokuapp.com/articulos/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Articulos[]>{
    return this.httpClient.get<Articulos[]>(this.artURL + 'lista');
  }

  public details(id: number): Observable<Articulos>{
    return this.httpClient.get<Articulos>(this.artURL + `detail/${id}`);
  }

  public save(articulos: Articulos): Observable<any>{
    return this.httpClient.post<any>(this.artURL + 'create', articulos);
  }
  
  public update(id: number, articulos: Articulos): Observable<any>{
    return this.httpClient.put<any>(this.artURL + `update/${id}`, articulos);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.artURL + `delete/${id}`);
  }

  public actualizarPrecio(id: number, precioVenta: number): Observable<any>{
    return this.httpClient.put<any>(this.artURL + `newprecio/${id}`, precioVenta);
  }
}
