import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SalesOrderLine } from '../../../../shared/models/salesManagement/SalesOrderLine.model';
import { Observable } from 'rxjs';
import { SalesOrderLineDTO } from '../../../../shared/models/dto/SalesManegementDTO/SalesOrderLine.dto';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderLineService {

  private apiUrl = 'http://localhost:8080/api/salesOrderLine';
  private http = inject(HttpClient);


  getSalesOrderLine():Observable<SalesOrderLine[]>{
    return this.http.get<SalesOrderLine[]>(`${this.apiUrl}/listSalesOrderLine`);
  }
  
  getSalesOrderLineListBySalesOrderId(id:number):Observable<SalesOrderLine[]>{
    return this.http.get<SalesOrderLine[]>(`${this.apiUrl}/listSalesOrderLine/${id}`);
  }
  addSalesOrderLine(salesOrder :SalesOrderLineDTO):Observable<SalesOrderLine>{
    return this.http.post<SalesOrderLine>(`${this.apiUrl}/addSalesOrderLine`,salesOrder)
  
  }

  findSalesOrderLineById(id:number):Observable<SalesOrderLine>{
    return this.http.get<SalesOrderLine>(`${this.apiUrl}/find/${id}`);
  }

  editSalesOrderLine(salesOrderLine:SalesOrderLineDTO , salesOrderLineId:number):Observable<SalesOrderLine>{
    return this.http.put<SalesOrderLine>(`${this.apiUrl}/update/${salesOrderLineId}`,salesOrderLine);
  }

  deleteSalesOrderLine(salesOrderLineId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${salesOrderLineId}`);
  }

}
