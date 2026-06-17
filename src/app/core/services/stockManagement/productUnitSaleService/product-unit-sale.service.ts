import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProductUnitSale } from '../../../../shared/models/StockManagment/ProductUnitSale.model';
import { Observable } from 'rxjs';
import { ProductUnitSaleDTO } from '../../../../shared/models/dto/stockManagmentDTO/ProductUnitSale.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductUnitSaleService {

 
  private apiUrl = 'https://finalstockmanagement-8.onrender.com/api/productUnitSale';
  private http = inject(HttpClient);

  getAllProductUnitSale():Observable<ProductUnitSale[]>{
    return this.http.get<ProductUnitSale[]>(`${this.apiUrl}/ListProductUnitSale`);
  }

  addProductUnitSale(productUnitSale : ProductUnitSaleDTO):Observable<ProductUnitSale>{
    console.log("Category service is called to add a new category");
    return this.http.post<ProductUnitSale>(`${this.apiUrl}/addProductUnitSale`,productUnitSale);
  }

  findProductUnitSaleById(id:number):Observable<ProductUnitSale>{
    return this.http.get<ProductUnitSale>(`${this.apiUrl}/find/${id}`);
  }
  findProductUnitSaleByProductVariantId(id:number):Observable<ProductUnitSale[]>{
    return this.http.get<ProductUnitSale[]>(`${this.apiUrl}/findByProductVariant/${id}`);
  }

  editProductUnitSale(productUnitSale:ProductUnitSaleDTO , productUnitSaleId:number):Observable<ProductUnitSale>{
    return this.http.put<ProductUnitSale>(`${this.apiUrl}/update/${productUnitSaleId}`,productUnitSale);
  }

  deleteProductUnitSale(productUnitSaleId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${productUnitSaleId}`);
  }
}
