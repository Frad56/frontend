import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseOrderLine } from '../../../../shared/models/PurchaseManagement/PurchaseOrderLine.model';
import { PurchaseOrderLineDTO } from '../../../../shared/models/dto/PurchaseManagementDTO/PurchaseOrderLine.dto';
import { PurchaseOrderLineRequest } from '../../../../shared/models/Request/PurchaseOrderLineRequest';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderLineService {

  private apiUrl = 'https://finalstockmanagement-8.onrender.com/api/purchaseOrderLine';
  private http = inject(HttpClient);

  getPurchaseOrderLineList():Observable<PurchaseOrderLine[]>{
    return this.http.get<PurchaseOrderLine[]>(`${this.apiUrl}/listPurchaseOrderLine`);
  }

  addPurchaseOrderLineWithoutPercentage(purchaseOrderLineDTO : PurchaseOrderLineDTO):Observable<PurchaseOrderLine>{
    return this.http.post<PurchaseOrderLine>(`${this.apiUrl}/addPurchaseOrderLineWithoutPercentage`,purchaseOrderLineDTO)
  }

  addPurchaseOrderLineWithPercentage(purchaseOrderLineDTO : PurchaseOrderLineDTO):Observable<PurchaseOrderLine>{
    return this.http.post<PurchaseOrderLine>(`${this.apiUrl}/addPurchaseOrderLineWithPercentage`,purchaseOrderLineDTO)
  }

  findPurchaseOrderLineById(id:number):Observable<PurchaseOrderLine>{
    return this.http.get<PurchaseOrderLine>(`${this.apiUrl}/find/${id}`);
  }

  editPurchaseOrderLine(purchaseOrderLineDTO:PurchaseOrderLineDTO, purchaseOrderLineId:number):Observable<PurchaseOrderLine>{
    return this.http.put<PurchaseOrderLine>(`${this.apiUrl}/update/${purchaseOrderLineId}`,purchaseOrderLineDTO);
  }

  deletePurchaseOrderLine(purchaseOrderLineId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${purchaseOrderLineId}`);
  }

  //addPurchaseOrderLineList
  //PurchaseOrderLineCreateRequest
  addPurchaseOrderLineListWithPercentage(purchaseOrderLineRq : PurchaseOrderLineDTO[]):Observable<{ message: string }>{
    return this.http.post<{ message: string }>(`${this.apiUrl}/addPurchaseOrderLineListWithPercentage`,purchaseOrderLineRq)
  }

  addPurchaseOrderLineListWithoutPercentage(purchaseOrderLineRq : PurchaseOrderLineDTO[]):Observable<{ message: string }>{
    return this.http.post<{ message: string }>(`${this.apiUrl}/addPurchaseOrderLineListWithoutPercentage`,purchaseOrderLineRq)
  }

  totalOfPurchaseOrder(purchaseOrderId: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>( `${this.apiUrl}/totalAmountOfPurchaseOrder/${purchaseOrderId}`,{});
  }

  deletePurchaseOrderLineByPurchaseOrderId(purchaseOrderId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/deleteByPurchaseOrder/${purchaseOrderId}`);
  }

  getListByPurchaseOrderId(purchaseOrderId:number):Observable<PurchaseOrderLine[]>{
    return this.http.get<PurchaseOrderLine[]>(`${this.apiUrl}/findByPurchaseOrder/${purchaseOrderId}`);
  }
}
