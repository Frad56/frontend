import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Shelf } from '../../../../shared/models/StockManagment/Shelf.model';
import { Observable } from 'rxjs';
import { ShelfDTO } from '../../../../shared/models/dto/stockManagmentDTO/Shelf.dto';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {

  private apiUrl = 'http://localhost:8080/api/shelf';
  private http = inject(HttpClient);

  getShelfs():Observable<Shelf[]>{
    return this.http.get<Shelf[]>(`${this.apiUrl}/ListShelves`);
  }

  addShelf(productVariant : ShelfDTO):Observable<Shelf>{
    console.log("shelf service is called to add a new shelf");
    return this.http.post<Shelf>(`${this.apiUrl}/addShelf`,productVariant);
  }

  findShelfById(id:number):Observable<Shelf>{
    return this.http.get<Shelf>(`${this.apiUrl}/find/${id}`);
  }

  editShelf(shelf:ShelfDTO , shelfId:number):Observable<Shelf>{
    return this.http.put<Shelf>(`${this.apiUrl}/update/${shelfId}`,shelf);
  }

  deleteShelf(shelfId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${shelfId}`);
  }
}
