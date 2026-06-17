import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductUnitPurchase } from '../../../../shared/models/StockManagment/ProductUnitPurchase.model';
import { HttpClient } from '@angular/common/http';
import { ProductUnitPurchaseDTO } from '../../../../shared/models/dto/stockManagmentDTO/ProductUnitPurchase.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductUnitPurchaseService {
  private apiUrl = 'https://finalstockmanagement-8.onrender.com/api/productUnitPurchase';
  private http = inject(HttpClient);

  getAllProductUnitPurchase():Observable<ProductUnitPurchase[]>{
    return this.http.get<ProductUnitPurchase[]>(`${this.apiUrl}/ListProductUnitPurchase`);
  }

  addProductUnitPurchase(productUnitPurchase : ProductUnitPurchaseDTO):Observable<ProductUnitPurchase>{
    return this.http.post<ProductUnitPurchase>(`${this.apiUrl}/addProductUnitPurchase`,productUnitPurchase);
  }

  findProductUnitPurchaseById(id:number):Observable<ProductUnitPurchase>{
    return this.http.get<ProductUnitPurchase>(`${this.apiUrl}/find/${id}`);
  }
  findProductUnitPurchaseByProductVariantId(id:number):Observable<ProductUnitPurchase[]>{
    return this.http.get<ProductUnitPurchase[]>(`${this.apiUrl}/findByProductVariant/${id}`);
  }

  editProductUnitPurchase(productUnitPurchase:ProductUnitPurchaseDTO , productUnitPurchaseId:number):Observable<ProductUnitPurchase>{
    return this.http.put<ProductUnitPurchase>(`${this.apiUrl}/update/${productUnitPurchaseId}`,productUnitPurchase);
  }

  deleteProductUnitPurchase(productUnitPurchaseId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${productUnitPurchaseId}`);
  }
}
