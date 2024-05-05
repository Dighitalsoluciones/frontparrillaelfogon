import { Injectable } from '@angular/core';
import { MovimientoStock } from '../Model/movimiento-stock';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientoStockService {

  stockURL = 'https://bkparrillaelfogon-5526d4bf3ec2.herokuapp.com/stock/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<MovimientoStock[]> {
    return this.httpClient.get<MovimientoStock[]>(this.stockURL + 'lista');
  }

  public details(id: number): Observable<MovimientoStock> {
    return this.httpClient.get<MovimientoStock>(this.stockURL + `detail/${id}`);
  }

  public save(movimientoStock: MovimientoStock): Observable<any> {
    return this.httpClient.post<any>(this.stockURL + 'create', movimientoStock);
  }

  public update(id: number, movimientoStock: MovimientoStock): Observable<any> {
    return this.httpClient.put<any>(this.stockURL + `update/${id}`, movimientoStock);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.stockURL + `delete/${id}`);
  }

  public getNextId(): Observable<number> {
    return this.httpClient.get<number>(this.stockURL + 'nextId');
  }

}
