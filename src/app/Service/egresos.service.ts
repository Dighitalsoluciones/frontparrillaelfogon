import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Egresos } from '../Model/egresos';

@Injectable({
  providedIn: 'root'
})
export class EgresosService {
  egresosURL = 'https://bkparrillaelfogon-5526d4bf3ec2.herokuapp.com/egresos/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Egresos[]>{
    return this.httpClient.get<Egresos[]>(this.egresosURL + 'lista');
  }

  public details(id: number): Observable<Egresos>{
    return this.httpClient.get<Egresos>(this.egresosURL + `detail/${id}`);
  }

  public save(egresos: Egresos): Observable<any>{
    return this.httpClient.post<any>(this.egresosURL + 'create', egresos);
  }
  
  public update(id: number, egresos: Egresos): Observable<any>{
    return this.httpClient.put<any>(this.egresosURL + `update/${id}`, egresos);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.egresosURL + `delete/${id}`);
  }

}
