import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recibos } from '../Model/recibos';

@Injectable({
  providedIn: 'root'
})
export class RecibosService {
  recibosURL = 'https://bkparrillaelfogon.herokuapp.com/recibos/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Recibos[]>{
    return this.httpClient.get<Recibos[]>(this.recibosURL + 'lista');
  }

  public details(id: number): Observable<Recibos>{
    return this.httpClient.get<Recibos>(this.recibosURL + `detail/${id}`);
  }

  public save(recibos: Recibos): Observable<any>{
    return this.httpClient.post<any>(this.recibosURL + 'create', recibos);
  }
  
  public update(id: number, recibos: Recibos): Observable<any>{
    return this.httpClient.put<any>(this.recibosURL + `update/${id}`, recibos);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.recibosURL + `delete/${id}`);
  }

  
}
