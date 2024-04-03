import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Objetosmapa } from '../Model/objetosmapa';

@Injectable({
  providedIn: 'root'
})
export class ObjetosMapaServiceService {

  objetosMapaURL = 'http://localhost:8080/objetosmapa/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Objetosmapa[]> {
    return this.httpClient.get<Objetosmapa[]>(this.objetosMapaURL + 'lista');
  }

  public details(id: number): Observable<Objetosmapa> {
    return this.httpClient.get<Objetosmapa>(this.objetosMapaURL + `detail/${id}`);
  }

  public save(objetosmapa: Objetosmapa): Observable<any> {
    return this.httpClient.post<any>(this.objetosMapaURL + 'create', objetosmapa);
  }

  public update(id: number, objetosmapa: Objetosmapa): Observable<any> {
    return this.httpClient.put<any>(this.objetosMapaURL + `update/${id}`, objetosmapa);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.objetosMapaURL + `delete/${id}`);
  }

  public updateAllMesas(objetosmapa: Objetosmapa[]): Observable<any> {
    return this.httpClient.put<any>(this.objetosMapaURL + 'updateAll', objetosmapa);
  }

}
