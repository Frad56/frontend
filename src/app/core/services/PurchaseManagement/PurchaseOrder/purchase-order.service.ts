import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseOrder } from '../../../../shared/models/PurchaseManagement/PurchaseOrder.model';
import { PurchaseOrderDTO } from '../../../../shared/models/dto/PurchaseManagementDTO/PurchaseOrder.dto';
import { PurchaseOrderDTORequest } from '../../../../shared/models/dto/PurchaseManagementDTO/PurchaseOrderDTORequest.dto';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private apiUrl = 'http://localhost:8080/api/purchaseOrder';
  private http = inject(HttpClient);
  id!:number;
  getPurchaseOrderList():Observable<PurchaseOrder[]>{
    return this.http.get<PurchaseOrder[]>(`${this.apiUrl}/listPurchaseOrder`);
  }
  
  getPurchaseOrderListNotDelivered():Observable<PurchaseOrder[]>{
    return this.http.get<PurchaseOrder[]>(`${this.apiUrl}/listNotDelivered`);
  }

  addPurchaseOrder(PurchaseOrderDTO : PurchaseOrderDTORequest):Observable<PurchaseOrder>{
    return this.http.post<PurchaseOrder>(`${this.apiUrl}/addPurchaseOrder`,PurchaseOrderDTO)
  
  }

  findPurchaseOrderById(id:number):Observable<PurchaseOrder>{
    return this.http.get<PurchaseOrder>(`${this.apiUrl}/find/${id}`);
  }

  editPurchaseOrder(purchaseOrder:PurchaseOrderDTO, purchaseOrderId:number):Observable<PurchaseOrder>{
    return this.http.put<PurchaseOrder>(`${this.apiUrl}/update/${purchaseOrderId}`,purchaseOrder);
  }

  deletePurchaseOrder(purchaseOrderId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${purchaseOrderId}`);
  }
  getProductId(productId:number){
      this.id =productId
  }
 
 


}
