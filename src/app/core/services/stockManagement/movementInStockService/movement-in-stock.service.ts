import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MovementInStock } from '../../../../shared/models/StockManagment/MovementInStock.model';
import { Observable } from 'rxjs';
import { MovementInStockDTO } from '../../../../shared/models/dto/stockManagmentDTO/MovementInStock.dto';

@Injectable({
  providedIn: 'root'
})
export class MovementInStockService {

  private apiUrl = 'https://finalstockmanagement-8.onrender.com/api/movementInStock';
  private http = inject(HttpClient);

  getMovementInStockList():Observable<MovementInStock[]>{
    return this.http.get<MovementInStock[]>(`${this.apiUrl}/ListMovementInStock`);
  }

  addMovementInStock(movementInStock : MovementInStockDTO):Observable<MovementInStock>{
    console.log("MovementInStock service is called to add a new MovementInStock");
    return this.http.post<MovementInStock>(`${this.apiUrl}/addMovementInStock`,movementInStock);
  }

  findMovementInStockById(id:number):Observable<MovementInStock>{
    return this.http.get<MovementInStock>(`${this.apiUrl}/find/${id}`);
  }

  editMovementInStock(movementInStock:MovementInStockDTO , movementInStockId:number):Observable<MovementInStock>{
    return this.http.put<MovementInStock>(`${this.apiUrl}/update/${movementInStockId}`,movementInStock);
  }

  deleteMovementInStock(movementInStockId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${movementInStockId}`);
  }

}
