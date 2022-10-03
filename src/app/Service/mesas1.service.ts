import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mesas1 } from '../Model/mesas1';

@Injectable({
  providedIn: 'root'
})
export class Mesas1Service {
  mesasURL = 'http://localhost:8080/mesas1/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Mesas1[]>{
    return this.httpClient.get<Mesas1[]>(this.mesasURL + 'lista');
  }

  public details(id: number): Observable<Mesas1>{
    return this.httpClient.get<Mesas1>(this.mesasURL + `detail/${id}`);
  }

  public save(mesas1: Mesas1): Observable<any>{
    return this.httpClient.post<any>(this.mesasURL + 'create', mesas1);
  }
  
  public update(id: number, mesas1: Mesas1): Observable<any>{
    return this.httpClient.put<any>(this.mesasURL + `update/${id}`, mesas1);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.mesasURL + `delete/${id}`);
  }
}
