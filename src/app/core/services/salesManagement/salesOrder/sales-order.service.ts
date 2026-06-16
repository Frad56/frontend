import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SalesOrder } from '../../../../shared/models/salesManagement/SalesOrder.model';
import { Observable } from 'rxjs';
import { SalesOrderDTO } from '../../../../shared/models/dto/SalesManegementDTO/SalesOrder.dto';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {
  private apiUrl = 'http://localhost:8080/api/salesOrder';
  private http = inject(HttpClient);


  getSalesOrders():Observable<SalesOrderDTO[]>{
    return this.http.get<SalesOrderDTO[]>(`${this.apiUrl}/listSalesOrder`);
  }

  addSalesOrder(salesOrder :SalesOrderDTO):Observable<SalesOrder>{
    return this.http.post<SalesOrder>(`${this.apiUrl}/addSalesOrder`,salesOrder)
  
  }

  findSalesOrderById(id:number):Observable<SalesOrder>{
    return this.http.get<SalesOrder>(`${this.apiUrl}/find/${id}`);
  }

  editSalesOrder(salesOrder:SalesOrderDTO , salesOrderId:number):Observable<SalesOrder>{
    return this.http.put<SalesOrder>(`${this.apiUrl}/update/${salesOrderId}`,salesOrder);
  }

  deleteSalesOrder(salesOrderId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${salesOrderId}`);
  }


}
