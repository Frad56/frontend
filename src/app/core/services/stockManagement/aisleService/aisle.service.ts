import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Aisle } from '../../../../shared/models/StockManagment/Aisle.model';
import { AisleDTO } from '../../../../shared/models/dto/stockManagmentDTO/Aisle.dto';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AisleService {
  private apiUrl = 'https://finalstockmanagement-8.onrender.com/api/aisle';
  private http = inject(HttpClient);

  getAisles():Observable<Aisle[]>{
    return this.http.get<Aisle[]>(`${this.apiUrl}/ListAisles`);
  }

  addAisle(aisle : AisleDTO):Observable<Aisle>{
    console.log("Aisle service is called to add a new Aisle");
    return this.http.post<Aisle>(`${this.apiUrl}/addAisle`,aisle)
  
  }

  findAisleById(id:number):Observable<Aisle>{
    return this.http.get<Aisle>(`${this.apiUrl}/find/${id}`);
  }

  editAisle(aisle:AisleDTO , aisleId:number):Observable<Aisle>{
    return this.http.put<Aisle>(`${this.apiUrl}/update/${aisleId}`,aisle);
  }

  deleteAisle(aisleId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${aisleId}`);
  }





}
