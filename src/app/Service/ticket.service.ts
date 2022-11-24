import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../Model/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  ticketURL = 'https://bkparrillaelfogon.herokuapp.com/ticket/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Ticket[]>{
    return this.httpClient.get<Ticket[]>(this.ticketURL + 'lista');
  }

  public details(id: number): Observable<Ticket>{
    return this.httpClient.get<Ticket>(this.ticketURL + `detail/${id}`);
  }

  public save(ticket: Ticket): Observable<any>{
    return this.httpClient.post<any>(this.ticketURL + 'create', ticket);
  }
  
  public update(id: number, ticket: Ticket): Observable<any>{
    return this.httpClient.put<any>(this.ticketURL + `update/${id}`, ticket);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.ticketURL + `delete/${id}`);
  }

  
}
