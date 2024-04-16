import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../Model/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  empleadoURL = 'https://bkparrillaelfogon-5526d4bf3ec2.herokuapp.com/empleado/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Empleado[]>{
    return this.httpClient.get<Empleado[]>(this.empleadoURL + 'lista');
  }

  public details(id: number): Observable<Empleado>{
    return this.httpClient.get<Empleado>(this.empleadoURL + `detail/${id}`);
  }

  public save(empleado: Empleado): Observable<any>{
    return this.httpClient.post<any>(this.empleadoURL + 'create', empleado);
  }
  
  public update(id: number, empleado: Empleado): Observable<any>{
    return this.httpClient.put<any>(this.empleadoURL + `update/${id}`, empleado);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.empleadoURL + `delete/${id}`);
  }
}
