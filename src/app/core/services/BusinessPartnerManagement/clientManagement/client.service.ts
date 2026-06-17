import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../../../shared/models/BusinessPartner/ClientManagement/Client.model';
import { ClientDTO } from '../../../../shared/models/dto/BusinessPartnerDTO/clientManagementDTO/client.dto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }
  private apiUrl = 'https://finalstockmanagement-8.onrender.com/api/client';
  private http = inject(HttpClient);

  getClients():Observable<Client[]>{
    return this.http.get<Client[]>(`${this.apiUrl}/ListClients`);
  }

  addClient(client: ClientDTO):Observable<Client>{
    return this.http.post<Client>(`${this.apiUrl}/add`,client);
  }

  findClientById(id:number):Observable<Client>{
    return this.http.get<Client>(`${this.apiUrl}/find/${id}`);
  }
  deleteClient(clientId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${clientId}`);
  }
  editClient(client:ClientDTO,id:number,):Observable<Client>{
    return this.http.put<Client>(`${this.apiUrl}/update/${id}`,client);
  }
  findByFirstName(name:string):Observable<Client[]>{
    return this.http.get<Client[]>(`${this.apiUrl}/searchClientByFirstName/${name}`);

  }
}
